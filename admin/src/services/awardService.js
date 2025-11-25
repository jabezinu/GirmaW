import axios from 'axios'
import { API_BASE_URL } from '../config.js'

const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken')
    return {
        'Authorization': `Bearer ${token}`
    }
}

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const awardService = {
    getAll: async () => {
        const response = await api.get('/awards')
        return response.data
    },

    getById: async (id) => {
        const response = await api.get(`/awards/${id}`)
        return response.data
    },

    create: async (awardData) => {
        let formData
        if (awardData instanceof FormData) {
            formData = awardData
        } else {
            formData = new FormData()
            Object.keys(awardData).forEach(key => {
                if (awardData[key] instanceof File) {
                    formData.append(key, awardData[key])
                } else if (awardData[key] !== null && awardData[key] !== undefined) {
                    formData.append(key, awardData[key])
                }
            })
        }
        const response = await api.post('/awards', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthHeaders()
            },
        })
        return response.data
    },

    update: async (id, awardData) => {
        let formData
        if (awardData instanceof FormData) {
            formData = awardData
        } else {
            formData = new FormData()
            Object.keys(awardData).forEach(key => {
                if (awardData[key] instanceof File) {
                    formData.append(key, awardData[key])
                } else if (awardData[key] !== null && awardData[key] !== undefined) {
                    formData.append(key, awardData[key])
                }
            })
        }
        const response = await api.put(`/awards/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthHeaders()
            },
        })
        return response.data
    },

    delete: async (id) => {
        const response = await api.delete(`/awards/${id}`, {
            headers: getAuthHeaders()
        })
        return response.data
    },
}

export default awardService
