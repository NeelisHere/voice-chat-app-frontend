import { useNavigate } from "react-router-dom"
import Card from "../components/Card"
import { Box, Button } from "@chakra-ui/react"

const SetUsername = ({ nextURL }) => {
    const navigate = useNavigate()
    return (
        <>
            <Box
                border={'2px solid red'}
                height={'80vh'}
                display={'flex'}
                alignItems={'center'}
            >
                <Card headingText={'Set Username'}>
                    <Box>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, dolores.
                    </Box>
                    <Button
                        m={'20px'}
                        colorScheme={'teal'}
                        onClick={() => navigate(nextURL)}
                    >
                        Next
                    </Button>
                </Card>
            </Box>
        </>
    )
}

export default SetUsername
