import { Box, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react'

const Email = () => {
    return (
        <Box>
            <Text m={'10px 0'} fontSize={'xl'} fontWeight={'bold'}>Enter Email Address</Text>
            <InputGroup mt={'20px'}>
                <Input placeholder='Email' />
            </InputGroup>
        </Box>
    )
}

export default Email
