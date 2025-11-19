import axios from 'axios'
import { API_BASE_URL } from '../config.js'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const contactMessageService = {
  // Create new contact message
  create: async (messageData) => {
    const response = await api.post('/contact-messages', messageData)
    return response.data
  },
}

export default contactMessageService