import {Modal,ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, Box, Input } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

const CreateRoomModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
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
                        <Box>
                            <Input variant='filled' placeholder='Enter Topic' />
                            
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='teal' w={'100%'} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateRoomModal
