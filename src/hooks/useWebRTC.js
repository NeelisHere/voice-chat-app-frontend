import { useCallback, useEffect, useRef } from "react"
import { useStateWithCallback } from "./useStateWithCallback"
import { socketInit } from '../api-calls/sockets.js'
import { ACTIONS } from '../socket-actions'
import freeice from "freeice"

export const useWebRTC = (roomId, user) => {
    // console.log('<useWebRTC>', user._id)
    const [clients, setClients] = useStateWithCallback([])
    const audioElements = useRef({}) // user to audio-html-tag mapping
    const connections = useRef({}) // socketId to webRTC-connection mapping
    const localMediaStream = useRef(null) // local audio stream
    const socket = useRef(null)
    // const clientsRef = useRef([])

    useEffect(() => {
        socket.current = socketInit()
    }, [])

    const provideRef = (instance, userId) => {
        audioElements.current[userId] = instance
    }

    const addNewClients = useCallback((newClient, cb) => {
        const lookingFor = clients.find(
            (client) => client._id === newClient._id
        )
        if (lookingFor === undefined) {
            setClients(
                (existingClients) => [...existingClients, newClient], cb
            )
        }
    }, [clients, setClients])

    // capture media
    useEffect(() => {
        const startCapture = async () => {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true
            })
        }
        startCapture().then(() => {
            addNewClients(user, () => {
                const localElement = audioElements.current[user._id]
                if (localElement) {
                    localElement.volume = 0 // so that we don't have to listen to our own audio
                    localElement.srcObject = localMediaStream.current //what has to be played
                }
                socket.current.emit(ACTIONS.JOIN, { roomId, user })
            })
        })
        return () => {
            // leaving the room
            // localMediaStream.current.getTracks().forEach((track) => track.stop())
            // socket.current.emit(ACTIONS.LEAVE, { roomId })
        }

    }, [addNewClients, roomId, user])

    //add-peer
    const handleNewPeer = useCallback(async ({ peerId, createOffer, user: remoteUser }) => {
        // if already connected, give warning
        if (peerId in connections.current) {
            return console.log('Peer already connected: ', user)
        }
        connections.current[peerId] = new RTCPeerConnection({
            iceServers: freeice()
        })
        // handle new ice-candidate
        connections.current[peerId].onicecandidate = (event) => {
            socket.current.emit(ACTIONS.RELAY_ICE, {
                peerId,
                icecandidate: event.candidate
            })
        }

        // handle on track with this connection
        connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
            // console.log(clientsRef.current)
            addNewClients(
                // { ...remoteUser, muted: true },
                remoteUser,
                () => {
                    // const currentUser = clientsRef.current.find(
                    //     (client) => client.id === user.id
                    // )
                    // if (currentUser) {
                    //     socket.current.emit(ACTIONS.MUTE_INFO, {
                    //         userId: user.id,
                    //         roomId,
                    //         isMute: currentUser.muted,
                    //     });
                    // }
                    if (audioElements.current[remoteUser._id]) {
                        audioElements.current[remoteUser._id].srcObject = remoteStream
                    } else {
                        let settled = false
                        const interval = setInterval(() => {
                            if (audioElements.current[remoteUser._id]) {
                                audioElements.current[remoteUser._id].srcObject = remoteStream
                                settled = true
                            }
                            if (settled) {
                                clearInterval(interval)
                            }
                        }, 300)
                    }
                }
            )
        }
        // add local tracks to remote connections
        localMediaStream.current.getTracks().forEach((track) => {
            connections.current[peerId].addTrack(
                track,
                localMediaStream.current
            )
        });

        // create offer
        if (createOffer) {
            const offer = await connections.current[peerId].createOffer()
            await connections.current[peerId].setLocalDescription(offer)
            // send offer to another client
            socket.current.emit(ACTIONS.RELAY_SDP, {
                peerId,
                sessionDescription: offer
            })
        }

    }, [addNewClients, user])



    useEffect(() => {
        socket.current.on(ACTIONS.ADD_PEER, handleNewPeer)
        return () => {
            socket.current.off(ACTIONS.ADD_PEER, handleNewPeer)
        }
    }, [handleNewPeer])

    /*
    const addNewClients = useCallback((newClient, cb) => {
        const lookingFor = clients.find(
            (client) => client._id === newClient._id
        )
        if (lookingFor === undefined) {
            setClients(
                (existingClients) => [...existingClients, newClient], cb
            )
        }
    }, [clients, setClients])

    useEffect(() => {
        clientsRef.current = clients
    }, [clients])

    useEffect(() => {
        const initChat = async () => {

            socket.current = socketInit()

            const captureMedia = async () => {
                localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                    audio: true
                })
            } 

            await captureMedia();

            addNewClients({ ...user, muted: true }, () => {
                const localElement = audioElements.current[user._id]
                if (localElement) {
                    localElement.volume = 0
                    localElement.srcObject = localMediaStream.current //what has to be played
                }
            })

            const handleNewPeer = async ({ 
                peerId, 
                createOffer, 
                user:remoteUser 
            }) => {
                // if already connected, give warning
                if (peerId in connections.current) {
                    return console.log(
                        'Peer already connected: ', 
                        user
                    )
                }
                connections.current[peerId] = new RTCPeerConnection({
                    iceServers: freeice()
                })
                // handle new ice-candidate
                connections.current[peerId].onicecandidate = (event) => {
                    socket.current.emit(ACTIONS.RELAY_ICE, {
                        peerId,
                        icecandidate: event.candidate
                    })
                }
    
                // handle on track with this connection
                connections.current[peerId].ontrack = ({
                    streams: [remoteStream]
                }) => {
                    console.log(clientsRef.current)
                    addNewClients(
                        { ...remoteUser, muted: true }, 
                        () => {
                            const currentUser = clientsRef.current.find(
                                (client) => client.id === user.id
                            )
                            if (currentUser) {
                                socket.current.emit(ACTIONS.MUTE_INFO, {
                                    userId: user.id,
                                    roomId,
                                    isMute: currentUser.muted,
                                });
                            }
                            if (audioElements.current[remoteUser._id]) {
                                audioElements.current[remoteUser._id].srcObject = remoteStream
                            } else {
                                let settled = false
                                const interval = setInterval(() => {
                                    if (audioElements.current[remoteUser._id]) {
                                        audioElements.current[remoteUser._id].srcObject = remoteStream
                                        settled = true
                                    }
                                    if (settled) {
                                        clearInterval(interval)
                                    }
                                }, 300)
                            }
                        }
                    )
                }
                // add local tracks to remote connections
                localMediaStream.current.getTracks().forEach((track) => {
                    connections.current[peerId].addTrack(
                        track, 
                        localMediaStream.current
                    )
                });
    
                // create offer
                if (createOffer) {
                    const offer = await connections.current[peerId].createOffer()
                    await connections.current[peerId].setLocalDescription(offer)
                    // send offer to another client
                    socket.current.emit(ACTIONS.RELAY_SDP, {
                        peerId, 
                        sessionDescription: offer
                    })
                }
            }

            const handleRemovePeer = async ({peerId, userId}) => {
                if (connections.current[peerId]) {
                    connections.current[peerId].close()
                }
                delete connections.current[peerId]
                delete audioElements.current[peerId]
                setClients((prevClientList) => {
                    return prevClientList.filter((client) => client._id !== userId)
                })
            }

            const handleIceCandidate = ({ peerId, icecandidate }) => {
                if (icecandidate) {
                    connections.current[peerId].addIceCandidate(icecandidate)
                }
                // connections.current[peerId]
                //     .addIceCandidate(icecandidate)
                //     .catch((err) => console.log(err))
            }

            const handleRemoteSDP = async ({ 
                peerId, 
                sessionDescription: remoteSessionDescription 
            }) => {
                connections.current[peerId].setRemoteDescription(
                    new RTCSessionDescription(remoteSessionDescription)
                )
                // if session description is of type 'offer', create an answer
                if (remoteSessionDescription.type === 'offer') {
                    const connection = connections.current[peerId]
                    const answer = await connection.createAnswer()
                    connection.setLocalDescription(answer)
                    socket.current.emit(ACTIONS.RELAY_SDP, {
                        peerId,
                        sessionDescription: answer
                    })
                }
            }

            const handleSetMute = (mute, userId) => {
                const clientIdx = clientsRef.current
                                    .map((client) => client._id)
                                    .indexOf(userId)
                const connectedClients = JSON.parse(
                    JSON.stringify(clientsRef.current)
                )
                if (clientIdx > -1) {
                    connectedClients[clientIdx].muted = mute
                    setClients(connectedClients)
                }
            }

            socket.current.on(ACTIONS.MUTE_INFO, ({ userId, isMute }) => {
                handleSetMute(isMute, userId);
            });
            socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);
            socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer)
            socket.current.on(ACTIONS.ICE_CANDIDATE, handleIceCandidate)
            socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSDP)
            socket.current.on(ACTIONS.MUTE, ({ peerId, userId }) => {
                handleSetMute(true, userId)
            })
            socket.current.on(ACTIONS.UNMUTE, ({ peerId, userId }) => {
                handleSetMute(false, userId)
            })
            socket.current.emit(ACTIONS.JOIN, { roomId, user })

        }

        initChat()

        return () => {
            localMediaStream.current
                .getTracks()
                .forEach((track) => track.stop())
            socket.current.emit(ACTIONS.LEAVE, { roomId })
            for (let peerId in connections.current) {
                connections.current[peerId].close();
                delete connections.current[peerId];
                delete audioElements.current[peerId];
            }
            socket.current.off(ACTIONS.ADD_PEER)
            socket.current.off(ACTIONS.REMOVE_PEER);
            socket.current.off(ACTIONS.ICE_CANDIDATE);
            socket.current.off(ACTIONS.SESSION_DESCRIPTION);
            socket.current.off(ACTIONS.MUTE);
            socket.current.off(ACTIONS.UNMUTE);
        }

    }, [addNewClients, roomId, setClients, user])
    */
    /*

    // useEffect(() => {
    //     socket.current = socketInit()
    // }, [])

    // audio-capturing
    useEffect(() => {
        // const startCapture = async () => {
        //     localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        //         audio: true
        //     })
        // }
        // startCapture().then(() => {
        //     addNewClients({ ...user, muted: true }, () => {
        //         const localElement = audioElements.current[user._id]
        //         if (localElement) {
        //             localElement.volume = 0
        //             localElement.srcObject = localMediaStream.current //what has to be played
        //         }
        //         socket.current.emit(ACTIONS.JOIN, { roomId, user })
        //     })
        // })
        return () => {
            // leaving the room
            // localMediaStream.current.getTracks().forEach((track) => track.stop())
            // socket.current.emit(ACTIONS.LEAVE, { roomId })
        }   

    }, [])

    // handle peer
    useEffect(() => {
        // const handleNewPeer = async ({ peerId, createOffer, user:remoteUser }) => {
        //     // if already connected, give warning
        //     if (peerId in connections.current) {
        //         return console.log('Peer already connected: ', peerId, user.username)
        //     }
        //     connections.current[peerId] = new RTCPeerConnection({
        //         iceServers: freeice()
        //     })
        //     // handle new ice-candidate
        //     connections.current[peerId].onicecandidate = (event) => {
        //         socket.current.emit(ACTIONS.RELAY_ICE, {
        //             peerId,
        //             icecandidate: event.candidate
        //         })
        //     }

        //     // handle on track with this connection
        //     connections.current[peerId].ontrack = ({
        //         streams: [remoteStream]
        //     }) => {
        //         addNewClients({ ...remoteUser, muted: true }, () => {
        //             if (audioElements.current[remoteUser._id]) {
        //                 audioElements.current[remoteUser._id].srcObject = remoteStream
        //             } else {
        //                 let settled = false
        //                 const interval = setInterval(() => {
        //                     if (audioElements.current[remoteUser._id]) {
        //                         audioElements.current[remoteUser._id].srcObject = remoteStream
        //                         settled = true
        //                     }
        //                     if (settled) {
        //                         clearInterval(interval)
        //                     }
        //                 }, 1000)
        //             }
        //         })
        //     }
        //     // add local tracks to remote connections
        //     localMediaStream.current.getTracks().forEach((track) => {
        //         connections.current[peerId].addTrack(track, localMediaStream.current)
        //     });

        //     // create offer
        //     if (createOffer) {
        //         const offer = await connections.current[peerId].createOffer()
        //         await connections.current[peerId].setLocalDescription(offer)
        //         // send offer to another client
        //         socket.current.emit(ACTIONS.RELAY_SDP, {
        //             peerId, 
        //             sessionDescription: offer
        //         })
        //     }
        // }

        // socket.current.on(ACTIONS.ADD_PEER, handleNewPeer)

        return () => {
            // socket.current.off(ACTIONS.ADD_PEER)
        }

    }, [])

    //handle ice-candidate
    useEffect(() => {
        // socket.current.on(ACTIONS.ICE_CANDIDATE, ({peerId, icecandidate}) => {
        //     if (icecandidate) {
        //         connections.current[peerId].addIceCandidate(icecandidate)
        //     }
        //     connections.current[peerId]
        //         .addIceCandidate(icecandidate)
        //         .catch((err) => console.log(err))
        // })

        return () => {
            // socket.current.off(ACTIONS.ICE_CANDIDATE)
        }

    }, [])

    //handle SDP
    useEffect(() => {
        // const handleRemoteSDP = async ({ 
        //     peerId, 
        //     sessionDescription: remoteSessionDescription 
        // }) => {
        //     connections.current[peerId].setRemoteDescription(
        //         new RTCSessionDescription(remoteSessionDescription)
        //     )
        //     // if session description is of type 'offer', create an answer
        //     if (remoteSessionDescription.type === 'offer') {
        //         const connection = connections.current[peerId]
        //         const answer = await connection.createAnswer()
        //         connection.setLocalDescription(answer)
        //         socket.current.emit(ACTIONS.RELAY_SDP, {
        //             peerId,
        //             sessionDescription: answer
        //         })
        //     }
        // }

        // socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSDP)

        return () => {
            // socket.current.off(ACTIONS.SESSION_DESCRIPTION)
        }

    }, [])

    // remove peer
    useEffect(() => {
        // const handleRemovePeer = async ({peerId, userId}) => {
        //     if (connections.current[peerId]) {
        //         connections.current[peerId].close()
        //     }
        //     delete connections.current[peerId]
        //     delete audioElements.current[peerId]
        //     setClients((prevClientList) => {
        //         return prevClientList.filter((client) => client._id !== userId)
        //     })
        // }
        // socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer)
        return () => {
            // socket.current.off(ACTIONS.REMOVE_PEER)
        }
    }, [])

    // listen to mute/unmute
    useEffect(() => {
        // socket.current.on(ACTIONS.MUTE, ({ peerId, userId }) => {
        //     setMute(true, userId)
        // })
        // socket.current.on(ACTIONS.UNMUTE, ({ peerId, userId }) => {
        //     setMute(false, userId)
        // })
        // const setMute = (mute, userId) => {
        //     const clientIdx = clientsRef.current.map((client) => client._id).indexOf(userId)
        //     const connectedClients = JSON.parse(
        //         JSON.stringify(clientsRef.current)
        //     )
        //     if (clientIdx > -1) {
        //         connectedClients[clientIdx].muted = mute
        //         setClients(connectedClients)
        //     }
        // }
    }, [clients])

    */
    /*
    const provideRef = (instance, userId) => {
        audioElements.current[userId] = instance
    }

    // handling mute-unmute features
    const handleMute = (mute, userId) => {
        // console.log(mute, userId)
        let settled = false
        if (userId === user._id) {
            let interval = setInterval(() => {
                if (localMediaStream.current) {
                    localMediaStream.current.getTracks()[0].enabled = !mute
                    if (mute) {
                        socket.current.emit(ACTIONS.MUTE, { roomId, userId })
                    } else  socket.current.emit(ACTIONS.UNMUTE, { roomId, userId })

                    settled = true
                }
                if (settled) clearInterval(interval)
            }, 200)
        }

    }

    */

    const handleMute = () => { }

    return { clients, provideRef, handleMute }

}