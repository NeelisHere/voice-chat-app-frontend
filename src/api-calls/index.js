import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        "Content-Type": "application/json",
        Accept: 'application/json'
    }
})

export const sendOTP = async (data) => {
    return await api.post('/api/send-otp', data)
}

export default api