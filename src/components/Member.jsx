import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { Box, Text, Avatar, AvatarBadge  } from "@chakra-ui/react"
import { useState } from 'react';

const Member = ({ id, username, avatar, provideRef }) => {
    const [mute, setMute] = useState(false)
    const [speaking, setSpeaking] = useState(false)
    const micStyle = { 
        width: '16px', 
        height: '16px', 
        color: 'black' 
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
                    onClick={() => setMute(!mute)}
                >
                    {
                        mute ? <MicOffIcon sx={micStyle} /> : <MicIcon sx={micStyle} />
                    }
                </AvatarBadge>
            </Avatar>
            <audio 
                controls 
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
