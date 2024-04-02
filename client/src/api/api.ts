import axios from "axios"

// const BASE_URL = 'http://localhost:8080'
const BASE_URL = 'https://heliverse-49va.onrender.com'

export const API = axios.create({
    baseURL: BASE_URL
})
