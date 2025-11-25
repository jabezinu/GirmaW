import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import awardService from '../services/awardService';
import { FaEdit, FaTrash, FaPlus, FaTrophy } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function AwardsList() {
    const [awards, setAwards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAwards();
    }, []);

    const fetchAwards = async () => {
        try {
            const data = await awardService.getAll();
            setAwards(data);
        } catch (err) {
            setError('Failed to fetch awards');
            toast.error('Failed to fetch awards');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this award?')) {
            try {
                await awardService.delete(id);
                setAwards(awards.filter(award => award._id !== id));
                toast.success('Award deleted successfully');
            } catch (err) {
                toast.error('Failed to delete award');
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <FaTrophy className="text-yellow-500 text-3xl" />
                    <h1 className="text-2xl font-bold text-gray-800">Awards & Certificates</h1>
                </div>
                <Link
                    to="/awards/new"
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors"
                >
                    <FaPlus /> Add New Award
                </Link>
            </div>

            {awards.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <FaTrophy className="text-gray-300 text-6xl mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-4">No awards yet</p>
                    <Link
                        to="/awards/new"
                        className="bg-emerald-600 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 hover:bg-emerald-700 transition-colors"
                    >
                        <FaPlus /> Add Your First Award
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {awards.map((award) => (
                        <div key={award._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="relative h-48 bg-gray-100">
                                <img
                                    src={award.image}
                                    alt={award.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{award.title}</h3>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{award.description}</p>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs text-gray-500">
                                        {formatDate(award.dateReceived)}
                                    </span>
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        Order: {award.displayOrder}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        to={`/awards/${award._id}/edit`}
                                        className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
                                    >
                                        <FaEdit /> Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(award._id)}
                                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
