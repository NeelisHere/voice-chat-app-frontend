import { Box, Button, Stack, Spinner } from "@chakra-ui/react"
import { ArrowBackIcon } from '@chakra-ui/icons'
import Navigation from "../components/Navigation"
import MembersList from "../components/MembersList"
// import { speakers, listeners } from "../data"
import { useNavigate, useParams } from "react-router-dom"
import { useWebRTC } from "../hooks/useWebRTC"
import { useSelector } from "react-redux"
import BackHandIcon from '@mui/icons-material/BackHand';
import { useEffect, useState } from "react"
import { getRoom } from "../api-calls/index.js"
import toast from "react-hot-toast"

const Room = () => {
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.auth.user)
    const [loading, setLoading] = useState(false)
    const [room, setRoom] = useState(null)
    const { id: roomId } = useParams()
    const { clients, provideRef } = useWebRTC(roomId, currentUser)

    const handleManualLeave = () => {
        navigate(`/rooms`)
    }

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                setLoading(true)
                const { data } = await getRoom(roomId)
                // console.log('[ROOM]: ', data)
                setRoom((prev) => data.room)
            } catch (error) {
                console.log(error)
                toast.error('Error getting room information!')
            } finally {
                setLoading(false)
            }
        }
        fetchRoom()
    }, [roomId])
    
    return (
        <>
            <Navigation />
            <Box
            // border={'2px solid black'}
            >
                <Box
                    // border={'2px solid blue'}
                    width={'80%'}
                    m={'auto'}
                >
                    {/* nav-componenet within the chat */}
                    <Box
                        // border={'2px solid red'}
                        shadow={'md'}
                        display={"flex"}
                        justifyContent={'space-between'}
                        bg={'white'}
                        my={'20px'}
                        p={'10px 32px'}
                        borderRadius={'5px'}
                    >
                        <Box
                            // border={'2px solid red'}
                            display={"flex"}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <Button
                                leftIcon={<ArrowBackIcon />}
                                colorScheme="teal"
                                display={{ base: 'none', sm: 'none', md: 'flex', lg: 'flex' }}
                                onClick={handleManualLeave}
                            >
                                Voice Rooms
                            </Button>
                            <ArrowBackIcon 
                                display={{ base: 'flex', sm: 'flex', md: 'none', lg: 'none' }}
                                boxSize={6} 
                                onClick={handleManualLeave}
                            />
                        </Box>
                        <Box 
                            display={'flex'}
                            // border={'2px solid red'}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <Button
                                mx={'20px'}
                                leftIcon={<BackHandIcon />}
                                display={{ base: 'none', sm: 'none', md: 'flex', lg: 'flex' }}
                            >
                                Raise Hand
                            </Button>
                            <Button
                                mx={'5px'}
                                display={{ base: 'flex', sm: 'flex', md: 'none', lg: 'none' }}
                            >
                                <BackHandIcon />
                            </Button>
                            <Button onClick={handleManualLeave} variant={'ghost'} colorScheme="red">
                                Leave Room
                            </Button>
                        </Box>
                    </Box>

                    {/* Chats */}
                    <Stack
                        // border={'2px solid red'}
                        borderRadius={'10px'}
                        bg={'white'}
                        direction={'column'}
                        px={'20px'}
                        maxHeight={'500px'}
                        overflowY={'scroll'}
                    >
                        <Box 
                            // border={'2px solid blue'}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            py={'10px'}
                            mt={'20px'}
                            fontSize={'md'}
                            fontWeight={'semibold'}
                        >
                            {/* {console.log(room)} */}
                            {loading? <Spinner /> : room?.topic}
                        </Box>

                        {/* speakers */}
                        {/* {
                            clients.map((client, index) => {
                                console.log(client)
                                return (
                                    <div key={index}>
                                        <audio 
                                            controls 
                                            autoPlay
                                            ref={(instance) => provideRef(instance, client._id)}
                                        >
                                        </audio>
                                        {client.username}
                                    </div>
                                    
                                )
                            })
                        } */}

                        {/* Listeners */}
                        <MembersList 
                            title={'Listeners'} 
                            clients={clients}
                            provideRef={provideRef}
                        />

                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default Room
