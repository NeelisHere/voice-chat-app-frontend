import { Box, Grid, InputGroup, InputLeftElement, Text, Input } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'
import Navigation from "../components/Navigation"
import RoomCard from "../components/RoomCard"
import { getAllRooms } from "../api-calls"
import CreateRoomModal from "../components/CreateRoomModal"
import { useEffect, useState } from "react"


const Rooms = () => {
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const fetchRooms = async () => {
            const { data } = await getAllRooms()
            setRooms(data.rooms)
        }
        fetchRooms()
    }, [])

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
                        >
                            <Text
                                fontSize={'xl'}
                                fontWeight={'semibold'}
                                color={'gray.600'}
                            >
                                All Voice Rooms
                            </Text>
                        </Box>
                        <Box>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <SearchIcon color='gray.600' />
                                </InputLeftElement>
                                <Input variant='filled' placeholder='Filled' />
                            </InputGroup>

                        </Box>
                        <Box>
                            <CreateRoomModal></CreateRoomModal>
                        </Box>

                    </Box>

                    {/* Rooms list */}
                    <Grid 
                        templateColumns='repeat(4, 1fr)'
                        gridAutoRows={'max-content'}
                        gap={5}
                        border={'2px solid red'}
                        overflowY={'scroll'}
                        height={'500px'}
                        sx={
                            {
                                '::-webkit-scrollbar': {
                                    display: 'none'
                                }
                            }
                        }
                    >
                        {
                            rooms.map((room, index) => {
                                return(
                                    <RoomCard 
                                        key={index}
                                        topic={room.topic}
                                        speakers={room.speakers}
                                    />
                                )
                            })
                        }
                    </Grid>

                </Box>
            </Box>
        </>
    )
}

export default Rooms
