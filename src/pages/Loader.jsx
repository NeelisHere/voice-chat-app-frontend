import { Box, Spinner } from '@chakra-ui/react'
import React from 'react'

const Loader = ({ size }) => {
    return (
        <Box
            // border={'2px solid red'}
            h={'100vh'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Spinner 
                thickness='5px'
                speed='0.65s'
                emptyColor='gray.200'
                color='teal'
                size={size} 
            />
        </Box>
    )
}

export default Loader
