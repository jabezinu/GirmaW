import axios from 'axios'
import { API_BASE_URL } from '../config.js'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const contactMessageService = {
  // Get all contact messages
  getAll: async () => {
    const response = await api.get('/contact-messages')
    return response.data
  },

  // Get single contact message by ID
  getById: async (id) => {
    const response = await api.get(`/contact-messages/${id}`)
    return response.data
  },

  // Create new contact message
  create: async (messageData) => {
    const response = await api.post('/contact-messages', messageData)
    return response.data
  },

  // Update contact message
  update: async (id, messageData) => {
    const response = await api.put(`/contact-messages/${id}`, messageData)
    return response.data
  },

  // Delete contact message
  delete: async (id) => {
    const response = await api.delete(`/contact-messages/${id}`)
    return response.data
  },
}

export default contactMessageService