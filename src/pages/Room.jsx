import { Box, Button, Stack, Spinner } from "@chakra-ui/react"
import { ArrowBackIcon } from '@chakra-ui/icons'
import Navigation from "../components/Navigation"
import MembersList from "../components/MembersList"
import { useNavigate, useParams } from "react-router-dom"
import { useWebRTC } from "../hooks/useWebRTC"
import { useSelector } from "react-redux"
import DeleteIcon from '@mui/icons-material/Delete';
import { useCallback, useEffect, useState } from "react"
import { getRoom, deleteRoomAPI } from "../api-calls/index.js"
import toast from "react-hot-toast"
import EditRoomModal from "../components/EditRoomModal"
// import { useSpeakers } from "../slices/speakersProvider.js"

const Room = () => {
    const navigate = useNavigate()
    // const { setSpeakers, setRoomId } = useSpeakers()
    const currentUser = useSelector((state) => state.auth.user)
    const [loading, setLoading] = useState(false)
    const [room, setRoom] = useState(null)
    const { id: roomId } = useParams()
    const { clients, provideRef, handleMute } = useWebRTC(roomId, currentUser)

    // useEffect(() => {
    //     console.log(clients);
    //     setSpeakers(clients)
    //     setRoomId(roomId)
    // }, [clients, roomId, setRoomId, setSpeakers])


    const handleManualLeave = () => {
        navigate(`/rooms`)
    }

    const deleteRoom = async(roomId) => {
        try {
            setLoading(true)
            await deleteRoomAPI(roomId)
            toast.success('Room deleted successfully!')
        } catch (error) {
            console.log(error)
            toast.error('Error deleting room!')
        } finally {
            setLoading(false)
            navigate('/rooms')
        }
    }

    const fetchRoom = useCallback(async () => {
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
    }, [roomId])

    useEffect(() => {
        fetchRoom()
    }, [fetchRoom, roomId])
    
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
                        {
                            currentUser?._id === room?.ownerId 
                            &&
                            <Box 
                                display={'flex'}
                                // border={'2px solid red'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                gap={2}
                            >
                                <EditRoomModal fetchRoom={fetchRoom}>
                                    Edit
                                </EditRoomModal>
                                <Button 
                                    onClick={() => deleteRoom(roomId)} 
                                    leftIcon={<DeleteIcon />}
                                    isLoading={loading}
                                >
                                    Delete
                                </Button>
                            </Box>
                        }
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

                        {/* Members */}
                        <MembersList 
                            title={'Listeners'} 
                            clients={clients}
                            provideRef={provideRef}
                            handleMute={handleMute}
                        />

                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default Room
