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

export const sendOTP = async (data) => api.post('/api/send-otp', data)

export const verifyOTP = async (data) => api.post('/api/verify-otp', data)

export const activate = async (data) => api.post('/api/activate', data)

export const logoutUser = async () => api.post('/api/logout')


//interceptors
api.interceptors.response.use(
    (config) => {
        return config
    },
    async (err) => {
        const originalReq = err.config
        if (err.response.status === 401 && originalReq && !originalReq._isRetry) {
            originalReq._isRetry = true
            try {
                const refReqURL = `${API_BASE_URL}/api/refresh`
                await axios.get(refReqURL, { withCredentials: true })
                return api.request(originalReq)

            } catch (error) {
                console.log(error.message)
            }
        } else {
            throw err
        }
    }
)

export default api