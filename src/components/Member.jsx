import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { Box, Text, Avatar, AvatarBadge  } from "@chakra-ui/react"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Member = ({ client, provideRef, handleMute }) => {
    console.log('inside Memeber.jsx: ', client)
    const { _id: id, username, avatar, muted } = client
    const [mute, setMute] = useState(true)
    const currentUser = useSelector((state) => state.auth.user)
    const [speaking, setSpeaking] = useState(false)
    
    const micStyle = { 
        width: '16px', 
        height: '16px', 
        color: 'black' 
    }

    useEffect(() => {
        handleMute(mute, currentUser._id)
    }, [currentUser._id, handleMute, mute])

    const handleMuteClick = (clientId) => {
        if (clientId !== currentUser._id) return;
        setMute((prevMuteState) => !prevMuteState)
    }

    return (
        <Box
            // border={'2px solid red'}
            display={'flex'}
            flexDir={'column'}
            gap={2}
            alignItems={'center'}
            justifyContent={'center'}
        >

            <Avatar
                size={'lg'}
                border={`4px solid ${speaking ? '#4FD1C5' : '#DEDEDE'}`}
                name={username}
                src={avatar}
            > 
                <AvatarBadge
                    borderWidth={'4px'}
                    cursor={'pointer'}
                    boxSize={'28px'}
                    bg={'#dedede'}
                    onClick={() => handleMuteClick(id)}
                >
                    {
                        muted ? <MicOffIcon sx={micStyle} /> : <MicIcon sx={micStyle} />
                    }
                </AvatarBadge>
            </Avatar>
            <audio 
                // controls 
                autoPlay
                ref={(instance) => provideRef(instance, id)}
            >
            </audio>

            <Text fontSize={'sm'}>
                {username}
            </Text>
            
        </Box>
    )
}

export default Member
