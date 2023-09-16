import { Box, Text, AvatarGroup, Avatar, Button } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"

const RoomCard = ({ topic, speakers }) => {
    const navigate = useNavigate()
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
                navigate('/rooms/roomId')
            }}
            cursor={'pointer'}
        >
            <Box

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
                        speakers.map(({username, avatar}, index) => {
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

            <Box>
                <Button w={'100%'} size={'sm'}>
                    See Members
                </Button>
            </Box>

        </Box>
    )
}

export default RoomCard
