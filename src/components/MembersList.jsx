import { Box, Grid, Text } from "@chakra-ui/react"
import Member from "./Member";

const MembersList = ({ title, clients, provideRef }) => {
    return (
        <Box>
            <Text fontSize={'xl'} fontWeight={'semibold'} ml={'20px'}>
                {title}
            </Text>
            <Grid
                // border={'2px solid blue'}
                templateColumns={{ 
                    base: 'repeat(2, 1fr)', 
                    md: 'repeat(5, 1fr)',
                    lg: 'repeat(7, 1fr)',
                }} 
                gap={6}
                gridAutoRows={'max-content'}
                my={'20px'}
            >
                {
                    clients.map((client, index) => {
                        // console.log('[members-list]: ', client)
                        return (
                            <Member 
                                key={index}
                                id={client._id}
                                username={client.username}
                                avatar={client.avatar}
                                provideRef={provideRef}
                            />
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

export default MembersList
