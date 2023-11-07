import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import Card from "../components/Card"
import { Box, Button, Text, Input, InputGroup, } from '@chakra-ui/react'
import Navigation from "../components/Navigation"
import { sendOTP } from "../api-calls/index.js"
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { setOTP } from "../slices/AuthSlice"
import { isEmailValid } from '../api-calls/services.js'


const GetPhoneEmail = ({ nextURL }) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const ref = useRef()
    const navigate = useNavigate()
    const handleSubmit = async () => {
        const email = ref.current.value.trim()
        if (!isEmailValid(email)) {
            toast.error('Email format invalid!')
            return;
        }
        setLoading(true)
        try {
            const { data } = await sendOTP({ email })
            // console.log(1, data);
            dispatch(setOTP(data))
            toast.success('OTP sent to you email. Check inbox.')
            navigate(nextURL)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Navigation />
            <Box
                // border={'2px solid red'}
                height={'80vh'}
                display={'flex'}
                alignItems={'center'}
            >
                <Card>
                    <Box>
                        <Text m={'10px 0'} fontSize={'xl'} fontWeight={'bold'}>Enter Email Address</Text>
                        <InputGroup mt={'20px'}>
                            <Input placeholder='Email' ref={ref} />
                        </InputGroup>
                    </Box>
                    <Button
                        m={'20px'}
                        colorScheme={'teal'}
                        isLoading={loading}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                    <Text
                        fontSize={'xs'}
                        lineHeight={'shorter'}
                        color={'#59515e'}
                    >
                        Please enter your login credentials to access your account. For assistance, contact our support team at npaulxy@gmail.com                    
                    </Text>
                </Card>
            </Box>
        </>
    )
}

export default GetPhoneEmail
