import axios from 'axios'

// Shared Axios client for the Spring Boot backend
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})
