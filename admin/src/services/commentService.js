import axios from 'axios'

const API_BASE_URL = 'http://localhost:5001/api'

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

  // Get single comment by ID
  getById: async (id) => {
    const response = await api.get(`/comments/${id}`)
    return response.data
  },

  // Create new comment
  create: async (commentData) => {
    const response = await api.post('/comments', commentData)
    return response.data
  },

  // Update comment
  update: async (id, commentData) => {
    const response = await api.put(`/comments/${id}`, commentData)
    return response.data
  },

  // Delete comment
  delete: async (id) => {
    const response = await api.delete(`/comments/${id}`)
    return response.data
  },
}

export default commentService