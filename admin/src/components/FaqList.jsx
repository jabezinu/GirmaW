import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllFaqs, deleteFaq } from '../services/faqService';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

export default function FaqList() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        try {
            const data = await getAllFaqs();
            setFaqs(data);
        } catch (err) {
            setError('Failed to fetch FAQs');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this FAQ?')) {
            try {
                await deleteFaq(id);
                setFaqs(faqs.filter(faq => faq._id !== id));
            } catch (err) {
                alert('Failed to delete FAQ');
            }
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">FAQs</h1>
                <Link
                    to="/faqs/new"
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors"
                >
                    <FaPlus /> Add New FAQ
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Answer</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {faqs.map((faq) => (
                            <tr key={faq._id}>
                                <td className="px-6 py-4 whitespace-normal">
                                    <div className="text-sm font-medium text-gray-900">{faq.question}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-normal">
                                    <div className="text-sm text-gray-500 line-clamp-2">{faq.answer}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link
                                        to={`/faqs/${faq._id}/edit`}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4 inline-block"
                                    >
                                        <FaEdit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(faq._id)}
                                        className="text-red-600 hover:text-red-900 inline-block"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
