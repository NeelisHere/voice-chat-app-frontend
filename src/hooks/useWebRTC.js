import { useCallback, useEffect, useRef } from "react"
import { useStateWithCallback } from "./useStateWithCallback"

// const users = [
//     { id: 1, username: 'Mukesh K' },
//     { id: 1, username: 'Dinesh S' },
// ]

export const useWebRTC = (roomId, user) => {
    console.log('<useWebRTC>', user)
    const [clients, setClients] = useStateWithCallback([])
    const audioElements = useRef({})
    const connections = useRef({})
    const localMediaStream = useRef(null)

    const provideRef = (instance, userId) => {
        audioElements.current[userId] = instance
    }

    const addNewClients = useCallback((newClient, cb) => {
        const lookingFor = clients.find((client) => client._id === newClient._id)
        if (lookingFor === undefined) {
            setClients((existingClients) => [...existingClients, newClient], cb)
        }

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
                    // localElement.volume = 0
                    localElement.srcObject = localMediaStream.current //what has to be played
                }

                
            })
        })

    }, [])

    // setClients((prev) => {}, (state) => {
    //     return state
    // })

    return { clients, provideRef }
}