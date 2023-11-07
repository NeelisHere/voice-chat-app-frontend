import React, { useState } from 'react'
import Navigation from '../components/Navigation'
import { Box, Text, Button } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/Card'

const Home = () => {
    const navigate = useNavigate()
    const [hover, setHover] = useState(false)

    return (
        <>
            <Navigation />
            <Box 
                // border={'2px solid red'}
                height={'80vh'}
                display={'flex'}
                alignItems={'center'}
            >
                <Card headingText={'Welcome'}>
                    <Box>
                    Welcome to our voice chat application, a gateway to meaningful conversations. Whether it's catching up with friends or collaborating on projects, our platform offers seamless and crystal-clear communication. Join us in this auditory journey of connection and camaraderie. Your voice matters here.
                    </Box>
                    <Button
                        onClick={() => navigate('/get-phone-email')}
                        m={'20px'}
                        colorScheme={'teal'}
                    >
                        Register
                    </Button>
                    <Text>
                        {'Already have an account? '}
                        <Link
                            style={hover ? { textDecoration: 'underline' } : {}}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            to={'/get-phone-email'}
                        >
                            Login
                        </Link>
                    </Text>
                </Card>
            </Box>
        </>
    )
}

export default Home
