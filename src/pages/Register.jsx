import Card from "../components/Card"
import GetPhoneEmail from './GetPhoneEmail'
import GetOTP from './GetOTP'
import SetActualName from './SetActualName'
import SetAvatar from './SetAvatar'
import SetUsername from './SetUsername'
import { useState } from "react"

const steps = [ GetPhoneEmail, GetOTP, SetActualName, SetAvatar, SetUsername ]

const Register = () => {
    const [step, useStep] = useState(steps[0])
    return (
        <>
            {/* <Card>

            </Card> */}
            register main page
        </>
    )
}

export default Register
