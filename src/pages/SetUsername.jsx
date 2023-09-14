import { useNavigate } from "react-router-dom"
import Card from "../components/Card"
import { Box, Button, Input, InputGroup } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUsername } from '../slices/activateSlice.js'
import Navigation from '../components/Navigation';
import toast from "react-hot-toast"

const SetUsername = ({ nextURL }) => {
    const { username } = useSelector((state) => state.activate)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ref = useRef()
    // const [usernameText, setUsernameText] = useState('')
    const [loading, setLoading] = useState(false) 

    const handleSubmit = async () => {
        setLoading(true)
        try {
            dispatch(setUsername(ref.current.value))
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
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
                <Card headingText={'Set Your Username'}>
                    <Box>
                        <InputGroup mt={'20px'}>
                            <Input 
                                ref={ref}
                                value={username} 
                                onChange={(e) => dispatch(setUsername(e.target.value))}  
                                placeholder='Set Username' 
                            />
                        </InputGroup>
                    </Box>
                    <Button
                        m={'20px'}
                        colorScheme={'teal'}
                        onClick={handleSubmit}
                        isLoading={loading}
                    >
                        Save
                    </Button>
                </Card>
            </Box>
        </>
    )
}

export default SetUsername
