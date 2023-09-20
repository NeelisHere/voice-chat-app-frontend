import { Box, Grid, Text } from "@chakra-ui/react"
import Member from "./Member";

const MembersList = ({ title, members, provideRef }) => {
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
                    members.map(({ id, username, avatar }, index) => {
                        return (
                            <Member key={index}
                                username={username}
                                avatar={avatar}
                            />
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

export default MembersList
