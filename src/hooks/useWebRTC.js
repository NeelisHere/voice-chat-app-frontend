import { useCallback, useEffect, useRef } from "react"
import { useStateWithCallback } from "./useStateWithCallback"
import { socketInit } from '../api-calls/sockets.js'
import { ACTIONS } from '../socket-actions'
import freeice from "freeice"

export const useWebRTC = (roomId, user) => {
    console.log('<useWebRTC>', user)
    const [clients, setClients] = useStateWithCallback([])
    const audioElements = useRef({})
    const connections = useRef({}) // storing socketId to webRTC connection mapping
    const localMediaStream = useRef(null)
    const socket = useRef(null)

    useEffect(() => {
        socket.current = socketInit()
    }, [])

    //**********************************************
    // const provideRef = (instance, userId) => {
    //     audioElements.current[userId] = instance
    // }
    useEffect(() => {
        socket.current.emit('x', {success: true})
    }, [])

    //************************************************* */ 

    
    const addNewClients = useCallback((newClient, cb) => {
        // console.log('<newClient>', newClient)
        const lookingFor = clients.find((client) => client._id === newClient._id)
        if (lookingFor === undefined) {
            setClients((existingClients) => [...existingClients, newClient], cb)
        }
        console.log('<after a client enters>', clients)
    }, [clients, setClients])

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
                    localElement.volume = 0
                    localElement.srcObject = localMediaStream.current //what has to be played
                }
                socket.current.emit(ACTIONS.JOIN, { roomId, user })
            })
        })
        return () => {
            // leaving the room
            localMediaStream.current.getTracks().forEach((track) => track.stop())
            socket.current.emit(ACTIONS.LEAVE, { roomId })
        }   

    }, [])

    const provideRef = (instance, userId) => {
        audioElements.current[userId] = instance
    }

    useEffect(() => {
        const handleNewPeer = async ({ peerId, createOffer, user:remoteUser }) => {
            // if already connected, give warning
            if (peerId in connections.current) {
                return console.log('Peer already connected: ', peerId, user.username)
            }

            connections.current[peerId] = new RTCPeerConnection({
                iceServers: freeice()
            })

            // handle new ice candidate
            connections.current[peerId].onicecandidate = (event) => {
                console.log('ice candidate in client (before relay-ice):', event)
                socket.current.emit(ACTIONS.RELAY_ICE, {
                    peerId,
                    icecandidate: event.candidate
                })
            }

            // handle on track with this connection
            connections.current[peerId].ontrack = ({
                streams: [remoteStream]
            }) => {
                addNewClients(remoteUser, () => {
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
                        }, 1000)
                    }
                })
            }
            // add local tracks to remote connections
            localMediaStream.current.getTracks().forEach((track) => {
                connections.current[peerId].addTrack(track, localMediaStream.current)
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
        socket.current.on(ACTIONS.ADD_PEER, handleNewPeer)

        return () => {
            socket.current.off(ACTIONS.ADD_PEER)
        }

    }, [])

    //handle ice-candidate
    useEffect(() => {
        socket.current.on(ACTIONS.ICE_CANDIDATE, ({peerId, icecandidate}) => {
            console.log('[ice-candidate]', icecandidate)
            // if (icecandidate) {
            //     connections.current[peerId].addIceCandidate(icecandidate)
            // }
            connections.current[peerId]
                .addIceCandidate(icecandidate)
                .catch((err) => console.log(err))
        })

        return () => {
            socket.current.off(ACTIONS.ICE_CANDIDATE)
        }

    }, [])

    //handle SDP
    useEffect(() => {
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
                socket.current.emit(ACTIONS.SESSION_SECRIPTION, {
                    peerId,
                    sessionDescription: answer
                })
            }
        }
        socket.current.on(ACTIONS.SESSION_SECRIPTION, handleRemoteSDP)

        return () => {
            socket.current.off(ACTIONS.SESSION_SECRIPTION)
        }

    }, [])

    // remove peer
    useEffect(() => {
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
        socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer)
        return () => {
            socket.current.off(ACTIONS.REMOVE_PEER)
        }
    }, [])
    
    return { clients, provideRef }


}