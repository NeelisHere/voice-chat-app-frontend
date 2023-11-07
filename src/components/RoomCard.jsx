import { Box, Text, AvatarGroup, Avatar, Button, Divider, AbsoluteCenter } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { setCurrentRoom } from '../slices/roomSlice'
// import { useWebRTC } from "../hooks/useWebRTC"
// import { useSelector } from "react-redux"
// import { useSpeakers } from '../slices/speakersProvider'

const RoomCard = ({ room }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const currentUser = useSelector((state) => state.auth.user)
    const { topic, speakers, _id, ownerId } = room
    // const { clients } = useWebRTC(_id, currentUser)
    // const { speakers, roomId } = useSpeakers()

    // console.log(speakers)

    return (
        <Box
            // border={'2px solid blue'}
            borderRadius={'5px'}
            bg={'white'}
            // padding={'15px'}
            pt={'15px'}
            shadow={'base'}
            _hover={{
                shadow: 'lg'
            }}
            onClick={() => {
                dispatch(
                    setCurrentRoom({
                        topic
                    })
                )
                navigate(`/rooms/${_id}`)
            }}
            cursor={'pointer'}
        >
            <Box
                // border={'2px solid blue'}
                fontSize={{ base: 'sm', sm: 'sm', md: 'md', lg: 'md' }}
            >
                <Text 
                    textAlign={'center'}
                    fontSize={'large'}
                    fontWeight={'semibold'}
                >
                    {topic}
                </Text>
            </Box>

            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                my={'20px'}
            >
                <AvatarGroup size='md' max={3}>
                    {
                        // roomId === _id &&
                        speakers?.map(({username, avatar}, index) => {
                            return(
                                <Avatar 
                                    key={index}
                                    name={username} 
                                    src={avatar}
                                />
                            )
                        })
                    }
                </AvatarGroup>
            </Box>

            <Box position='relative'>
                <Divider />
                <AbsoluteCenter bg='white' px={'5px'}>
                    <Text color={'gray.300'} fontSize={'xs'}>Creator</Text>
                </AbsoluteCenter>
            </Box>

            <Box
                // border={'2px solid red'}
                // bg={'#f4f4f4'}
                p={'12px 5px'}
                display={'flex'}
            >
                <Avatar
                    // border={'4px solid #f4f4f4'}
                    mx={'10px'}
                    size='md'
                    name={ownerId?.username}
                    src={ownerId?.avatar}
                />
                <Box
                    // border={'2px solid blue'}
                    display={{ base: 'none', sm: 'flex', md: 'flex', lg: 'flex' }}
                    flexDir={'column'}
                    alignItems={'flex-start'}
                >
                    <Text fontSize={''}>{ownerId?.username}</Text>
                    <Text fontSize={'sm'}>{ownerId?.email}</Text>
                </Box>
            </Box>

        </Box>
    )
}

export default RoomCard
