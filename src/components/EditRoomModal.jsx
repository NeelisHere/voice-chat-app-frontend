import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    useDisclosure, Button, Input, Text, Radio, RadioGroup, Stack
} from '@chakra-ui/react'
import EditIcon from '@mui/icons-material/Edit';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRoom, editRoom } from "../api-calls/index.js"
import toast from 'react-hot-toast';


const EditRoomModal = ({ children, fetchRoom: fetchRoomAPICallFromParent }) => {
    const { id: roomId } = useParams()
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const [room, setRoom] = useState(null)
    const [loading, setLoading] = useState(false)
    const [roomType, setRoomType] = useState(null)
    const [topic, setTopic] = useState(null)

    const fetchRoom = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await getRoom(roomId)
            // console.log('[ROOM]: ', data)
            const { room } = data
            // setRoom((prev) => data.room)
            setRoomType(room.roomType)
            setTopic(room.topic)
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

    const handleEdit = async () => {
        try {
            setLoading(true)
            await editRoom(roomId, { topic, roomType })
            fetchRoomAPICallFromParent()
            toast.success('Room updated successfully!')
        } catch (error) {
            console.log(error)
            toast.error('Error editing room information!')
        } finally {
            setLoading(false)
            onClose()
        }
    }

    return (
        <>
            <Button onClick={onOpen} leftIcon={<EditIcon />}>{ children }</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={'center'}>Edit Room</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            topic &&
                            <Input 
                                variant={'filled'} 
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />
                        }
                        {
                            roomType &&
                            <RadioGroup 
                                onChange={setRoomType} 
                                value={roomType} 
                                px={'10px'}
                                // border={'2px solid red'}
                            >
                                <Text>Which Room type do you want to choose?</Text>
                                <Stack direction={'column'} p={'15px'}>
                                    <Radio value='open'>Open</Radio>
                                    <Radio value='social'>social</Radio>
                                    <Radio value='closed'>closed</Radio>
                                </Stack>
                            </RadioGroup>
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button 
                            width={'100%'} 
                            isLoading={loading} 
                            colorScheme='teal'
                            my={3}
                            onClick={handleEdit}
                        >
                            Edit Room
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditRoomModal
