
import axios from 'axios'
import { auth } from '../config/firebase'

// Axios client for protected Spring Boot endpoints
export const authApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

// Attach a Firebase ID Token before every protected request
authApi.interceptors.request.use(async (config) => {
    const user = auth.currentUser

    if (!user) {
        throw new Error('Please sign in before checkout.')
    }

    const token = await user.getIdToken()

    config.headers.set(
        'Authorization',
        `Bearer ${token}`
    )

    return config
})
