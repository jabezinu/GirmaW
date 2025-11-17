import axios from 'axios'

const API_BASE_URL = 'http://localhost:5001/api'

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