import { createContext, useContext, useState } from 'react';

const SpeakersContext = createContext(null);

export const useSpeakers = () => useContext(SpeakersContext)

const SpeakersProvider = ({children}) => {
    const [speakers, setSpeakers] = useState([])
    const [roomId, setRoomId] = useState(null)

    return(
        <SpeakersContext.Provider value={{ speakers, setSpeakers, roomId, setRoomId }}>
            {children}
        </SpeakersContext.Provider>
    )
}

export default SpeakersProvider