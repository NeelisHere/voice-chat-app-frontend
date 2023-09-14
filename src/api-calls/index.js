import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000',
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

export default api