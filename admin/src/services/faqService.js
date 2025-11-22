import axios from 'axios';

const API_URL = 'http://localhost:5001/api/faqs';

const getAuthHeader = () => {
    const token = localStorage.getItem('adminToken');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const getAllFaqs = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createFaq = async (faqData) => {
    const response = await axios.post(API_URL, faqData, getAuthHeader());
    return response.data;
};

export const updateFaq = async (id, faqData) => {
    const response = await axios.put(`${API_URL}/${id}`, faqData, getAuthHeader());
    return response.data;
};

export const deleteFaq = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    return response.data;
};
