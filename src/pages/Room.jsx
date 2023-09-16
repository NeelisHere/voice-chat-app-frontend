import { Box, Button, Avatar, Stack, Grid, Text } from "@chakra-ui/react"
import { LogoutIcon } from "../components/Icons"
import { ArrowBackIcon } from '@chakra-ui/icons'
import Navigation from "../components/Navigation"
import MembersList from "../components/MembersList"
import { speakers, listeners } from "../data"
import { useNavigate } from "react-router-dom"

const Room = () => {

    const navigate = useNavigate()

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
                            display={"flex"}
                            alignItems={'center'}
                        >
                            <Button 
                                leftIcon={<ArrowBackIcon />} 
                                colorScheme="teal"
                                onClick={() => {
                                    navigate(`/rooms`)
                                }}
                            >
                                All Voice Rooms
                            </Button>
                        </Box>
                        <Box>
                            <Button variant={'ghost'} colorScheme="red">
                                Leave Room
                            </Button>
                        </Box>
                    </Box>

                    {/* Chats */}
                    <Stack
                        // border={'2px solid red'}
                        bg={'white'}
                        direction={'column'}
                        px={'20px'}
                        maxHeight={'500px'}
                        overflowY={'scroll'}
                    >
                        <Box //topic
                            // border={'2px solid blue'}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            py={'10px'}
                            mt={'20px'}
                            fontSize={'md'}
                            fontWeight={'semibold'}
                        >
                            JavaScript is Awesome!
                        </Box>
                        
                        {/* speakers */}
                        <MembersList title={'Speakers'} members={speakers} />

                        {/* Listeners */}
                        <MembersList title={'Listeners'} members={listeners} />
                    </Stack>

                </Box>
            </Box>
        </>
    )
}

export default Room
