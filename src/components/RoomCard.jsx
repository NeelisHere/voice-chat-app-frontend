import { Box, Text, AvatarGroup, Avatar, Button } from '@chakra-ui/react'

const room = {
    id: 3,
    topic: 'Which framework is the best for backend development?',
    speakers: [
        {
            id: 1,
            username: 'John Doe',
            avatar: 'https://bit.ly/dan-abramov'
        },
        {
            id: 2,
            username: 'John Doe',
            avatar: 'https://bit.ly/code-beast'
        },
        {
            id: 3,
            username: 'John Doe',
            avatar: 'https://bit.ly/kent-c-dodds'
        },
        {
            id: 4,
            username: 'John Doe',
            avatar: 'https://bit.ly/sage-adebayo'
        }
    ],
    totalMembers: 4
}

const RoomCard = ({ topic, speakers }) => {
    return (
        <Box
            // border={'2px solid blue'}
            borderRadius={'5px'}
            bg={'white'}
            padding={'15px'}
            shadow={'base'}
            _hover={{
                shadow: 'md'
            }}
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
