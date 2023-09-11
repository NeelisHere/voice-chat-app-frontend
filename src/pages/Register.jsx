import { Box } from '@chakra-ui/react'
import GetPhoneEmail from './GetPhoneEmail'
import GetOTP from './GetOTP'
import SetActualName from './SetActualName'
import SetAvatar from './SetAvatar'
import SetUsername from './SetUsername'
import { useEffect, useState } from "react"

const steps = [ GetPhoneEmail, GetOTP, SetActualName, SetAvatar, SetUsername ]

const Register = () => {
    const [step, setStep] = useState(0)
    let Component = steps[step]
    useEffect(() => {
        Component = steps[step]
    }, [step])

    return (
        <Box
            // border={'2px solid red'}
            h={'100vh'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Component 
                step={step}
                setStep={setStep}
            />
        </Box>
    )
}

export default Register
