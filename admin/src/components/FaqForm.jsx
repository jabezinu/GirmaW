import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createFaq, updateFaq, getAllFaqs } from '../services/faqService';

export default function FaqForm() {
    const [formData, setFormData] = useState({
        question: '',
        answer: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchFaq();
        }
    }, [id]);

    const fetchFaq = async () => {
        try {
            const faqs = await getAllFaqs();
            const faq = faqs.find(f => f._id === id);
            if (faq) {
                setFormData({
                    question: faq.question,
                    answer: faq.answer
                });
            }
        } catch (err) {
            setError('Failed to fetch FAQ details');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (id) {
                await updateFaq(id, formData);
            } else {
                await createFaq(formData);
            }
            navigate('/faqs');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    {id ? 'Edit FAQ' : 'Create New FAQ'}
                </h2>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Question
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            value={formData.question}
                            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Answer
                        </label>
                        <textarea
                            required
                            rows="6"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            value={formData.answer}
                            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/faqs')}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save FAQ'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
