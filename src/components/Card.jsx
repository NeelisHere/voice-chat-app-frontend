import { Container, Text } from "@chakra-ui/react"

const Card = ({ children, headingText }) => {
    return (
        <Container
            // border={'2px solid blue'}
            textAlign={'center'}
            borderRadius={'10px'}
            bg={'white'}
            shadow={'md'}
            p={'30px'}
        >
            <Text mb={'20px'} fontWeight={'bold'} fontSize={'xl'}>{ headingText }</Text>
            { children }
        </Container>
    )
}

export default Card
