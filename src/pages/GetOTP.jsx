import { useNavigate, Link } from "react-router-dom"
import Card from "../components/Card"
import { Box, Button,Input, InputGroup, Text } from "@chakra-ui/react"
import { useState } from "react"

const GetOTP = ({ nextURL }) => {
    const [hover, setHover] = useState(false)
    const navigate = useNavigate()
    return (
        <Card headingText={'Enter the OTP'}>
            <Box>
                <InputGroup mt={'20px'}>
                    <Input placeholder='Enter the OTP-Code sent to your mobile/email' />
                </InputGroup>
            </Box>
            <Text fontSize={'sm'} mt={'10px'}>
                {`Did't receive? `}
                <Link
                    style={hover ? { textDecoration: 'underline' } : {}}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    to={'/get-phone-email'}
                >
                    Resend OTP
                </Link>
            </Text>
            <Button 
                m={'20px'} 
                colorScheme={'teal'} 
                onClick={() => navigate(nextURL)}
            >   
                Next
            </Button>
            <Text fontSize={'xs'} lineHeight={'shorter'} color={'#59515e'}> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis esse, recusandae laboriosam ipsa quibusdam eveniet maiores culpa praesentium sit aperiam.</Text>
        </Card>
    )
}

export default GetOTP
