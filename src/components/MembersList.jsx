import { Box, Grid, Text, Avatar } from "@chakra-ui/react"

const MembersList = ({ title, members }) => {
    return (
        <Box>
            <Text fontSize={'xl'} fontWeight={'semibold'} ml={'20px'}>
                {title}
            </Text>
            <Grid
                // border={'2px solid blue'}
                templateColumns='repeat(7, 1fr)' gap={6}
                gridAutoRows={'max-content'}
                my={'20px'}
            >
                {
                    members.map(({ username, avatar }, index) => {
                        return (
                            <Box
                                key={index}
                                // border={'2px solid red'}
                                display={'flex'}
                                flexDir={'column'}
                                gap={2}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <Avatar
                                    size={'lg'}
                                    border={'4px solid #dedede'}
                                    name={username}
                                    src={avatar}
                                />
                                <Text fontSize={'sm'}>
                                    {username}
                                </Text>
                            </Box>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

export default MembersList
