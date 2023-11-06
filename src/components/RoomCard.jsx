import { Box, Text, AvatarGroup, Avatar, Button } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { setCurrentRoom } from '../slices/roomSlice'
import { useWebRTC } from "../hooks/useWebRTC"
import { useSelector } from "react-redux"

const RoomCard = ({ room }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentUser = useSelector((state) => state.auth.user)
    const { topic, speakers, _id } = room
    const { clients } = useWebRTC(_id, currentUser)
    
    return (
        <Box
            // border={'2px solid blue'}
            borderRadius={'5px'}
            bg={'white'}
            padding={'15px'}
            shadow={'base'}
            _hover={{
                shadow: 'lg'
            }}
            onClick={()=>{
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
                <Text>{topic}</Text>
            </Box>

            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                my={'20px'}
            >
                <AvatarGroup size='md' max={3}>
                    {
                        clients?.map(({username, avatar}, index) => {
                            return(
                                <Avatar 
                                    key={index}
                                    name={username} 
                                    src={avatar}
                                />
                            )
                        })
                    }
                    {
                        // console.log('---', clients)
                    }
                </AvatarGroup>
            </Box>

            {
                // <Box>
                //     <Button w={'100%'} size={'sm'}>
                //         See Members
                //     </Button>
                // </Box> 
            }

        </Box>
    )
}

export default RoomCard
