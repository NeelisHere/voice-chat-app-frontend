import { Link } from "react-router-dom"
import { Text, Box } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"

const Navigation = () => {
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
            // justifyContent={'center'}
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
        </Box>
    )
}

export default Navigation
