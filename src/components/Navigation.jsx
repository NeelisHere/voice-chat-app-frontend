import { Link } from "react-router-dom"
import { Text, Box, Button } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { logoutUser } from "../api-calls/index.js"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { setAuth } from "../slices/AuthSlice.js"
import UserCard from "./UserCard.jsx"
import { LogoutIcon } from './Icons'

const Navigation = () => {
    const { isAuth } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const logout = async () => {
        try {
            const { data } = await logoutUser()
            // console.log(data)
            dispatch(setAuth(data))
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <Box
            // border={'2px solid blue'}
            bg={'#333'}
            color={'white'}
            p={'15px 0'}
            w={'100%'}
            maxW={'100%'}
            // m={'0 auto'}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            shadow={'lg'}
        >
            <Link to={'/'}>
                <Box
                    // border={'2px solid red'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    margin={'0 20px'}
                >
                    <Image
                        borderRadius='full'
                        boxSize='36px'
                        mr={'8px'}
                        src={'/images/react-logo-small.png'}
                        alt='logo'
                    />
                    <Text 
                        display={{ base: 'none', sm: 'flex', md: 'flex', lg: 'flex' }} 
                        fontSize={'2xl'} 
                        fontWeight={'bold'}
                    >
                        Logo
                    </Text>
                </Box>
            </Link>
            {
                isAuth &&
                <Box 
                    // border={'2px solid red'}
                    display={"flex"}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Box mr={'20px'}>
                        <UserCard type={'nav'} />
                    </Box>
                    <Button
                        marginRight={'20px'}
                        // colorScheme="red"
                        p={'0'}
                        colorScheme='white'
                        variant={'ghost'}
                        size='lg'
                        onClick={logout}
                    >
                        <LogoutIcon />
                    </Button>
                </Box>
            }
        </Box>
    )
}

export default Navigation
