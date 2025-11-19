import axios from 'axios'
import { API_BASE_URL } from '../config.js'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const commentService = {
  // Get all comments
  getAll: async () => {
    const response = await api.get('/comments')
    return response.data
  },

  // Create new comment
  create: async (commentData) => {
    const response = await api.post('/comments', commentData)
    return response.data
  },
}

export default commentService