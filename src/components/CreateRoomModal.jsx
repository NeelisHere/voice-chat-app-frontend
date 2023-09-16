import {Modal,ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, Input,  Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { createRoom as create } from '../api-calls/index.js'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const CreateRoomModal = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [roomType, setRoomType] = useState('open')
    const [topic, setTopic] = useState('')
    const [loading, setLoading] = useState(false)

    const createRoom = async () => {
        // console.log({ roomType, topic })
        if (!topic) return;
        setLoading(true)
        try {
            const { data } = await create({ topic, roomType })
            console.log(data)
            toast.success('Room created successfully!')
            navigate(`/rooms/${data.room._id}`)
        } catch (error) {
            console.log(error)
            toast.error('Error creating room!')
        } finally {
            setLoading(false)
            setTopic('')
            setRoomType('')
            onClose()
        }
    }

    return (
        <>
            <Button
                colorScheme="teal"
                leftIcon={<AddIcon />}
                onClick={onOpen}
            >
                Create a Room
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a Room</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack direction={'column'} gap={8}>
                            <Input 
                                variant='filled' 
                                placeholder='Enter Topic' 
                                value={topic}
                                onChange={(e) => {
                                    setTopic(e.target.value)
                                }}
                            />
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
                            <Text fontSize={'xs'} color={'#333'} lineHeight={'shorter'}>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium enim inventore quia. Alias debitis illo placeat obcaecati veritatis fugit cum!
                            </Text>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button isLoading={loading} colorScheme='teal' w={'100%'} onClick={createRoom}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateRoomModal
