import { useState, useEffect } from 'react';
import { getAllFaqs } from '../services/faqService';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function FaqPage() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        try {
            const data = await getAllFaqs();
            setFaqs(data);
        } catch (err) {
            setError('Failed to load FAQs');
        } finally {
            setLoading(false);
        }
    };

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Frequently Asked Questions
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Find answers to common questions about our gemstones and services.
                    </p>
                </div>

                {error ? (
                    <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
                        {error}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {faqs.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">
                                No FAQs available at the moment.
                            </div>
                        ) : (
                            faqs.map((faq, index) => (
                                <div
                                    key={faq._id}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                                    >
                                        <span className="text-lg font-medium text-gray-900">
                                            {faq.question}
                                        </span>
                                        {openIndex === index ? (
                                            <FaChevronUp className="h-5 w-5 text-emerald-600" />
                                        ) : (
                                            <FaChevronDown className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                    <div
                                        className={`px-6 transition-all duration-300 ease-in-out ${openIndex === index
                                                ? 'max-h-96 py-4 opacity-100'
                                                : 'max-h-0 py-0 opacity-0'
                                            }`}
                                    >
                                        <div className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
