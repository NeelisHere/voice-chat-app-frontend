import { useNavigate, Link } from "react-router-dom"
import Card from "../components/Card"
import { Box, Button, Input, InputGroup, Text } from "@chakra-ui/react"
import Navigation from "../components/Navigation"
import { verifyOTP } from "../api-calls/index.js"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAuth } from "../slices/AuthSlice"
import toast from "react-hot-toast"

const GetOTP = ({ nextURL }) => {
    const { email, expires, hash } = useSelector((state) => state.auth.OTP)
    // const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const ref = useRef()
    const navigate = useNavigate()
    const [hover, setHover] = useState(false)
    const [loading, setLoading] = useState(false) 

    const handleVerify = async () => {
        setLoading(true)
        try {
            const { data } = await verifyOTP({ email, OTP: ref.current.value, hash, expires })
            // console.log(1, data)
            dispatch(setAuth(data))
            toast.success('OTP verified successfully!')
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
            // console.log(user)
            navigate(nextURL)
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
                <Card headingText={'Enter the OTP'}>
                    <Box>
                        <InputGroup mt={'20px'}>
                            <Input ref={ref} placeholder='Enter the OTP-Code sent to your email' />
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
                        onClick={handleVerify}
                        isLoading={loading}
                    >
                        Verify
                    </Button>
                    <Text fontSize={'xs'} lineHeight={'shorter'} color={'#59515e'}> 
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis esse, recusandae laboriosam ipsa quibusdam eveniet maiores culpa praesentium sit aperiam.
                    </Text>
                </Card>
            </Box>
        </>
    )
}

export default GetOTP
