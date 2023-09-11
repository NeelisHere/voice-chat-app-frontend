import { Box, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react'

const Phone = () => {
    return (
        <Box>
            <Text m={'10px 0'} fontSize={'xl'} fontWeight={'bold'}>Enter Phone no.</Text>
            <InputGroup mt={'20px'}>
                <InputLeftAddon children='+91' />
                <Input type='tel' placeholder='phone number' />
            </InputGroup>
        </Box>
    )
}

export default Phone
