import { Box, Avatar, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const UserCard = ({ type }) => {
    const { user } = useSelector((state) => state.auth)
    // const style = {
    //     flexDir: type === 'nav' ? 'row-reverse' : '', 
    //     infoMR: type === 'nav' ? '0' : '10px',
    //     infoAI: type === 'nav' ? 'flex-end' : ''
    // }
    return (
        <Box
            // border={'2px solid red'}
            display={'flex'}
            flexDir={'row-reverse'}
            mr={{ base: -5 }}
        >   
            <Avatar 
                // border={'4px solid #f4f4f4'}
                mx={'10px'}
                size='md' 
                name={ user.username }
                src={ user.avatar }
            />
            <Box
                // border={'2px solid blue'}
                display={{base: 'none', md: 'flex', lg: 'flex'}}
                flexDir={'column'}
                alignItems={'flex-end'}
            >
                <Text fontSize={''}>{ user.username }</Text>
                <Text fontSize={'sm'}>{ user.email }</Text>
            </Box>
        </Box>
  )
}

export default UserCard
