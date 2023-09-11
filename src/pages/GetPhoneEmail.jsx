import { useNavigate } from "react-router-dom"
import Card from "../components/Card"
import { Box, Button, Tabs, TabList, TabPanels, Tab, TabPanel, Text } from '@chakra-ui/react'
import Phone from "../components/Phone"
import Email from "../components/Email"

const GetPhoneEmail = ({ nextURL }) => {
    const navigate = useNavigate()
    return (
        <Card>
            <Box 
                // border={'2px solid red'}
            >
                <Tabs variant={'soft-rounded'} colorScheme="gray" isFitted >
                    <TabList>
                        <Tab>Phone</Tab>
                        <Tab>Email</Tab>
                    </TabList>
                    <TabPanels >
                        <TabPanel>
                            <Phone/>
                        </TabPanel>
                        <TabPanel>
                            <Email/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
            <Button
                m={'20px'}
                colorScheme={'teal'}
                onClick={() => navigate(nextURL)}
            >
                Next
            </Button>
            <Text fontSize={'xs'} lineHeight={'shorter'} color={'#59515e'}> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis esse, recusandae laboriosam ipsa quibusdam eveniet maiores culpa praesentium sit aperiam.</Text>
        </Card>
    )
}

export default GetPhoneEmail
