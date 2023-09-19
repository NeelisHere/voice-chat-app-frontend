import {io} from 'socket.io-client'

export const socketInit = () => {
    const options = {
        'force new connection' : true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    }
    const backendURL = 'http://localhost:8000'
    // process.env.REACT_APP_API_BASE_URL
    return io(backendURL, options)
}


