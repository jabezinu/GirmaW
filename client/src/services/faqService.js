import axios from 'axios';

const API_URL = 'http://localhost:5001/api/faqs';

export const getAllFaqs = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
