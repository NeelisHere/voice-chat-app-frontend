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
            <Box 
                // border={'2px solid red'}
                height={'90vh'}
                display={'flex'}
                alignItems={'center'}
            >
                <Card headingText={'Welcome Text'}>
                    <Box>
                        There are many benefits to a joint design and development system. Not only
                        does it bring benefits to the design team, but it also brings benefits to
                        engineering teams. It makes sure that our experiences have a consistent look
                        and feel, not just in our design specs, but in production.
                    </Box>
                    <Button
                        onClick={() => navigate('/register')}
                        m={'20px'}
                        colorScheme={'teal'}
                    >
                        Get Username
                    </Button>
                    <Text>
                        {'Have an invite text? '}
                        <Link
                            style={hover ? { textDecoration: 'underline' } : {}}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            to={'/register'}
                        >
                            Register
                        </Link>
                    </Text>
                </Card>
            </Box>
        </>
    )
}

export default Home
