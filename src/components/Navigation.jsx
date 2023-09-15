import { Link } from "react-router-dom"
import { Text, Box, Button } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { logoutUser } from "../api-calls"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { setAuth } from "../slices/AuthSlice"

const Navigation = () => {
    const dispatch = useDispatch()
    const logout = async () => {
        try {
            const { data } = await logoutUser()
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
            m={'0 auto'}
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
                    <Text fontSize={'2xl'} fontWeight={'bold'}>Logo</Text>
                </Box>
            </Link>
            <Button 
                marginRight={'20px'} 
                colorScheme='red' 
                size='sm'
                onClick={logout}
            >
                Logout
            </Button>
        </Box>
    )
}

export default Navigation
