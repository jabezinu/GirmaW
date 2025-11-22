import axios from 'axios'
import { API_BASE_URL } from '../config.js'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const gemstoneService = {
  getAll: async () => {
    const response = await api.get('/gemstones')
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/gemstones/${id}`)
    return response.data
  },

  create: async (gemstoneData) => {
    let formData
    if (gemstoneData instanceof FormData) {
      formData = gemstoneData
    } else {
      formData = new FormData()
      Object.keys(gemstoneData).forEach(key => {
        if (gemstoneData[key] instanceof File) {
          formData.append(key, gemstoneData[key])
        } else if (gemstoneData[key] !== null && gemstoneData[key] !== undefined) {
          formData.append(key, gemstoneData[key])
        }
      })
    }
    const response = await api.post('/gemstones', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  update: async (id, gemstoneData) => {
    let formData
    if (gemstoneData instanceof FormData) {
      formData = gemstoneData
    } else {
      formData = new FormData()
      Object.keys(gemstoneData).forEach(key => {
        if (gemstoneData[key] instanceof File) {
          formData.append(key, gemstoneData[key])
        } else if (gemstoneData[key] !== null && gemstoneData[key] !== undefined) {
          formData.append(key, gemstoneData[key])
        }
      })
    }
    const response = await api.put(`/gemstones/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/gemstones/${id}`)
    return response.data
  },
}

export default gemstoneService
