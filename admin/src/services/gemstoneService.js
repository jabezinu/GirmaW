import axios from 'axios'
import { API_BASE_URL } from '../config.js'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const gemstoneService = {
  // Get all gemstones
  getAll: async () => {
    const response = await api.get('/gemstones')
    return response.data
  },

  // Get single gemstone by ID
  getById: async (id) => {
    const response = await api.get(`/gemstones/${id}`)
    return response.data
  },

  // Create new gemstone
  create: async (gemstoneData) => {
    const formData = new FormData()

    // Add all fields to FormData
    Object.keys(gemstoneData).forEach(key => {
      if (key === 'image' && gemstoneData[key] instanceof File) {
        formData.append('image', gemstoneData[key])
      } else if (gemstoneData[key] !== null && gemstoneData[key] !== undefined) {
        formData.append(key, gemstoneData[key])
      }
    })

    const response = await api.post('/gemstones', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Update gemstone
  update: async (id, gemstoneData) => {
    const formData = new FormData()

    // Add all fields to FormData
    Object.keys(gemstoneData).forEach(key => {
      if (key === 'image' && gemstoneData[key] instanceof File) {
        formData.append('image', gemstoneData[key])
      } else if (gemstoneData[key] !== null && gemstoneData[key] !== undefined) {
        formData.append(key, gemstoneData[key])
      }
    })

    const response = await api.put(`/gemstones/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Delete gemstone
  delete: async (id) => {
    const response = await api.delete(`/gemstones/${id}`)
    return response.data
  },
}

export default gemstoneService