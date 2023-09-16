import { Box, Avatar, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const UserCard = ({ type }) => {
    const { user } = useSelector((state) => state.auth)
    const style = {
        flexDir: type === 'nav' ? 'row-reverse' : '', 
        infoMR: type === 'nav' ? '0' : '10px',
        infoAI: type === 'nav' ? 'flex-end' : ''
    }
    return (
        <Box
            // border={'2px solid red'}
            display={'flex'}
            flexDir={style.flexDir}
        >   
            <Avatar 
                mx={'10px'}
                size='md' 
                // border={'4px solid #f4f4f4'}
                name={ user.username }
                src={ user.avatar }
            />
            <Box
                mr={style.infoMR}
                // border={'2px solid blue'}
                display={'flex'}
                flexDir={'column'}
                alignItems={style.infoAI}
            >
                <Text fontSize={''}>{ user.username }</Text>
                <Text fontSize={'sm'}>{ user.email }</Text>
            </Box>
        </Box>
  )
}

export default UserCard
