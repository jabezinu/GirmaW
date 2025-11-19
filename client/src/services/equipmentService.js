import axios from 'axios'
import { API_BASE_URL } from '../config.js'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const equipmentService = {
  // Get all equipments
  getAll: async () => {
    const response = await api.get('/equipments')
    return response.data
  },
}

export default equipmentService