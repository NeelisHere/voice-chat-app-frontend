import axios from "axios";

const API_BASE_URL = 'http://localhost:8000'

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: 'application/json'
    }
})

export const sendOTP = async (data) => {
    return await api.post('/api/send-otp', data)
}

export const verifyOTP = async (data) => {
    return await api.post('/api/verify-otp', data)
}

export const activate = async (data) => {
    return await api.post('/api/activate', data)
}

//interceptors
api.interceptors.response.use(
    (config) => {
        return config
    }, 
    async (err) => {
        const originalReq = err.config
        // console.log('<1>', originalReq)
        if (err.response.status === 401 && originalReq && !originalReq._isRetry) {
            originalReq._isRetry = true
            try {
                const refReqURL = `${API_BASE_URL}/api/refresh`
                await axios.get(refReqURL, { withCredentials: true })
                // console.log('<2> ***')
                return api.request(originalReq)
                // console.log('<3> ***')

            } catch (error) {
                // console.log('<err>***')
                console.log(error.message)
            }
        } else {
            throw err
        }
    }   
)

export default api