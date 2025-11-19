import axios from 'axios'
import { API_BASE_URL } from '../config.js'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const courseService = {
  // Get all courses
  getAll: async () => {
    const response = await api.get('/courses')
    return response.data
  },
}

export default courseService