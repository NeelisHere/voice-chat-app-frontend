import { useCallback, useEffect, useRef } from "react"
import { useStateWithCallback } from "./useStateWithCallback"
import { socketInit } from '../api-calls/sockets.js'
import { ACTIONS } from '../socket-actions'
import freeice from "freeice"

export const useWebRTC = (roomId, user) => {
    const [clients, setClients] = useStateWithCallback([]);
    const audioElements = useRef({});
    const connections = useRef({});
    const socket = useRef(null);
    const localMediaStream = useRef(null);
    const clientsRef = useRef(null);

    useEffect(() => {
        // console.log('render socketInit', 2);
        socket.current = socketInit();
    }, []);

    const addNewClient = (newClient, cb) => {
        const lookingFor = clients.find(
            (client) => client._id === newClient._id
        );
        if (lookingFor === undefined) {
            setClients(
                (existingClients) => [...existingClients, newClient],
                cb
            );
        }
    }

    useEffect(() => {
        // console.log('render clientsRef.current = clients', 3);
        clientsRef.current = clients;
        console.log('ADDING CLIENT: ', clientsRef.current)
    }, [clients]);

    //start-capture
    useEffect(() => {
        // console.log('render startCapture', 4);

        // Start capturing local audio stream.
        const startCapture = async () => {
            localMediaStream.current =
                await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
        };

        // add user to clients list
        startCapture().then(() => {
            // console.log('render startCapture then', 5);
            addNewClient({ ...user, muted: true }, () => {
                // console.log('render add new client me', 6);
                const localElement = audioElements.current[user._id];
                if (localElement) {
                    localElement.volume = 0;
                    localElement.srcObject = localMediaStream.current;
                }
            });
            // console.log('render before ACTIONS.JOIN', 7);
            socket.current.emit(ACTIONS.JOIN, {
                roomId,
                user,
            });
        });

        // Leaving the room
        return () => {
            localMediaStream.current
                .getTracks()
                .forEach((track) => track.stop());
            socket.current.emit(ACTIONS.LEAVE, { roomId });
        };
    }, []);

    // Handle new peer
    useEffect(() => {
        // console.log('render handle new peer useEffect', 8);
        const handleNewPeer = async ({
            peerId,
            createOffer,
            user: remoteUser,
        }) => {
            // If already connected then prevent connecting again
            // console.log('render inside handle new peer', 8);
            if (peerId in connections.current) {
                return console.warn(
                    `You are already connected with ${peerId} (${user.name})`
                );
            }

            // Store it to connections
            connections.current[peerId] = new RTCPeerConnection({
                iceServers: freeice(),
            });

            // Handle new ice candidate on this peer connection
            connections.current[peerId].onicecandidate = (event) => {
                socket.current.emit(ACTIONS.RELAY_ICE, {
                    peerId,
                    icecandidate: event.candidate,
                });
            };

            // Handle on track event on this connection
            connections.current[peerId].ontrack = ({
                streams: [remoteStream],
            }) => {
                addNewClient({ ...remoteUser, muted: true }, () => {
                    // console.log('render add new client remote', 9);
                    if (audioElements.current[remoteUser._id]) {
                        audioElements.current[remoteUser._id].srcObject =
                            remoteStream;
                    } else {
                        let settled = false;
                        const interval = setInterval(() => {
                            if (audioElements.current[remoteUser._id]) {
                                audioElements.current[remoteUser._id].srcObject =
                                    remoteStream;
                                settled = true;
                            }

                            if (settled) {
                                clearInterval(interval);
                            }
                        }, 300);
                    }
                });
            };

            // Add connection to peer connections track
            localMediaStream.current.getTracks().forEach((track) => {
                connections.current[peerId].addTrack(
                    track,
                    localMediaStream.current
                );
            });

            // Create an offer if required
            if (createOffer) {
                const offer = await connections.current[peerId].createOffer();

                // Set as local description
                await connections.current[peerId].setLocalDescription(offer);

                // send offer to the server
                socket.current.emit(ACTIONS.RELAY_SDP, {
                    peerId,
                    sessionDescription: offer,
                });
            }
        };

        // Listen for add peer event from ws
        socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);
        return () => {
            socket.current.off(ACTIONS.ADD_PEER);
        };
    }, []);

    // Handle ice candidate
    useEffect(() => {
        // console.log('render handle ice candidate out', 10);
        socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
            if (icecandidate) {
                connections.current[peerId].addIceCandidate(icecandidate);
            }
        });

        return () => {
            socket.current.off(ACTIONS.ICE_CANDIDATE);
        };
    }, []);

    // Handle session description
    useEffect(() => {
        // console.log('render set remote media', 11);
        const setRemoteMedia = async ({
            peerId,
            sessionDescription: remoteSessionDescription,
        }) => {
            connections.current[peerId].setRemoteDescription(
                new RTCSessionDescription(remoteSessionDescription)
            );

            // If session descrition is offer then create an answer
            if (remoteSessionDescription.type === 'offer') {
                const connection = connections.current[peerId];

                const answer = await connection.createAnswer();
                connection.setLocalDescription(answer);

                socket.current.emit(ACTIONS.RELAY_SDP, {
                    peerId,
                    sessionDescription: answer,
                });
            }
        };

        socket.current.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);
        return () => {
            socket.current.off(ACTIONS.SESSION_DESCRIPTION);
        };
    }, []);

    // remove-peer
    useEffect(() => {
        // console.log('render handle remove peer out', 12);
        const handleRemovePeer = ({ peerId, userId }) => {
            // console.log('render inside handle remove peer out', 13);
            // Correction: peerID to peerId
            if (connections.current[peerId]) {
                connections.current[peerId].close();
            }

            delete connections.current[peerId];
            delete audioElements.current[peerId];
            setClients((list) => list.filter((c) => c._id !== userId));
        };

        socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

        return () => {
            for (let peerId in connections.current) {
                connections.current[peerId].close();
                delete connections.current[peerId];
                delete audioElements.current[peerId];
                // console.log('removing', connections.current);
            }
            socket.current.off(ACTIONS.REMOVE_PEER);
        };
    }, []);

    // mute/unmute
    useEffect(() => {
        // console.log('render inside mute useEffect', 14);
        const setMute = (mute, userId) => {
            const clientIdx = clientsRef.current.map((client) => client._id).indexOf(userId);
            const allConnectedClients = JSON.parse(JSON.stringify(clientsRef.current));
            if (clientIdx > -1) {
                allConnectedClients[clientIdx].muted = mute;
                setClients(allConnectedClients);
            }
        };
        socket.current.on(ACTIONS.MUTE, ({ peerId, userId }) => {
            setMute(true, userId);
        });
        socket.current.on(ACTIONS.UNMUTE, ({ peerId, userId }) => {
            setMute(false, userId);
        });
        return () => {
            socket.current.off(ACTIONS.MUTE)
            socket.current.off(ACTIONS.UNMUTE)
        }
    }, []);

    const provideRef = (instance, userId) => {
        audioElements.current[userId] = instance;
    };

    const handleMute = (isMute, userId) => {
        let settled = false;

        if (userId === user._id) {
            let interval = setInterval(() => {
                if (localMediaStream.current) {
                    localMediaStream.current.getTracks()[0].enabled = !isMute;
                    if (isMute) {
                        socket.current.emit(ACTIONS.MUTE, {
                            roomId,
                            userId: user._id,
                        });
                    } else {
                        socket.current.emit(ACTIONS.UNMUTE, {
                            roomId,
                            userId: user._id,
                        });
                    }
                    settled = true;
                }
                if (settled) {
                    clearInterval(interval);
                }
            }, 200);
        }
    };

    return { clients, provideRef, handleMute };
};

