import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setAuth } from '../slices/AuthSlice.js'

const useLoadingWithRefresh = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    useEffect(() => {
        (
            async () => {
                const url = `${process.env.REACT_APP_API_BASE_URL}/api/refresh`
                try {
                    const { data } = await axios.get(url, { withCredentials: true })
                    dispatch(setAuth(data))
                    setLoading(false)
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                    setLoading(false)
                }
            }
        )()
    }, [])

    return { loading }
}

export default useLoadingWithRefresh
