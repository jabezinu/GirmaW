import axios from 'axios'
import { API_BASE_URL } from '../config.js'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const videoService = {
  // Get all videos sorted by newest first
  getAll: async () => {
    const response = await api.get('/videos?sort=-createdAt')
    return response.data
  },
}

export default videoService