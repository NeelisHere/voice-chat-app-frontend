import { useNavigate } from "react-router-dom"
import Card from "../components/Card"
import { Box, Button, Text, Container, Avatar, AvatarBadge } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"
import Navigation from '../components/Navigation';
import { useDispatch, useSelector } from "react-redux"
import { setAvatar } from '../slices/activateSlice.js'
import { useEffect, useState } from "react";
import { activate } from "../api-calls/index.js";
import toast from "react-hot-toast";
import { setAuth } from "../slices/AuthSlice";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from "../api-calls/firebase.js";
import { v4 } from 'uuid'

// const defaultImage = 'https://bit.ly/broken-link'

const SetAvatar = ({ nextURL }) => {
    const dispatch = useDispatch()
    const { username, avatar } = useSelector((state) => state.activate)
    const navigate = useNavigate()
    const [avatarImageFile, setAvatarImageFile] = useState(null)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [mounted, setMounted] = useState(true)

    const previewAvatar = (e) => {
        e.preventDefault()
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = () => {
            setImage(reader.result)
            setAvatarImageFile(e.target.files[0])
        }
    }

    useEffect(() => {
        return () => {
            setMounted(false)
        }
    }, [])

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const imageId = v4()
            const fileStorageRef = ref(storage, `image/image-${imageId}`)
            // const blob = await fetch(image).then((res) => res.blob());
            await uploadBytes(fileStorageRef, avatarImageFile)
            const url = await getDownloadURL(fileStorageRef)
            const { data } = await activate({ username, avatar: url })
            if(data.auth) {
                if (mounted) {
                    dispatch(setAuth(data))
                    // dispatch(setAvatar(url))
                }
            }
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
                <Card headingText={'Set Your Avatar'}>
                    <Container>
                        <Text>Hi, {username}</Text>
                        <Button 
                            variant={'link'} 
                            onClick={() => {
                                navigate('/set-username')
                            }}
                        >
                            <Text fontSize={'xs'}>Change Username</Text>
                        </Button>
                    </Container>
                    <Box display={'flex'} flexDir={'column'}>
                        <Container 
                            my={'20px'} 
                            // border={'2px solid red'}
                            display={'flex'}
                            justifyContent={'center'}
                        >
                            <Box 
                                w={'105px'} 
                                h={'105px'} 
                                bg={'#dedede'} 
                                borderRadius={'50%'}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <Avatar 
                                    border={'4px solid white'}
                                    size='xl' 
                                    name={username}  
                                    src={image}
                                >
                                    {
                                        avatarImageFile && image &&
                                        <AvatarBadge 
                                            borderWidth={'4px'} 
                                            cursor={'pointer'} 
                                            // borderColor={'black'} 
                                            boxSize={'28px'} 
                                            bg={'#dedede'}
                                            onClick={() => {
                                                setAvatarImageFile(null)
                                                setImage(null)
                                            }}
                                        >
                                            <CloseIcon w={'8px'} h={'8px'} />
                                        </AvatarBadge>
                                    }
                                </Avatar>
                            </Box>
                        </Container>
                        
                        <Container 
                            // border={'2px solid red'}
                        >
                            <Button colorScheme='gray' variant='link'>
                                <input 
                                    style={{ display: "none" }} 
                                    type="file" 
                                    id="pfp" 
                                    onChange={previewAvatar}
                                />
                                <label htmlFor="pfp">Choose Profile Image</label>
                            </Button>
                        </Container>
                    </Box>
                    <Button
                        m={'20px'}
                        colorScheme={'teal'}
                        onClick={handleSubmit}
                        isLoading={loading}
                    >
                        Upload
                    </Button>
                </Card>
            </Box>
        </>
    )
}

export default SetAvatar
