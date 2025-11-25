import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import awardService from '../services/awardService';
import { toast } from 'react-toastify';

export default function AwardForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dateReceived: '',
        displayOrder: 0
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchAward();
        }
    }, [id]);

    const fetchAward = async () => {
        try {
            const award = await awardService.getById(id);
            setFormData({
                title: award.title,
                description: award.description,
                dateReceived: new Date(award.dateReceived).toISOString().split('T')[0],
                displayOrder: award.displayOrder
            });
            setImagePreview(award.image);
        } catch (err) {
            setError('Failed to fetch award details');
            toast.error('Failed to fetch award details');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('description', formData.description);
            submitData.append('dateReceived', formData.dateReceived);
            submitData.append('displayOrder', formData.displayOrder);

            if (imageFile) {
                submitData.append('image', imageFile);
            }

            if (id) {
                await awardService.update(id, submitData);
                toast.success('Award updated successfully');
            } else {
                if (!imageFile) {
                    setError('Please select an image');
                    toast.error('Please select an image');
                    setLoading(false);
                    return;
                }
                await awardService.create(submitData);
                toast.success('Award created successfully');
            }
            navigate('/awards');
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Something went wrong';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    {id ? 'Edit Award' : 'Create New Award'}
                </h2>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., Export Excellence Award 2024"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea
                            required
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Brief description of the award or certificate"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date Received *
                        </label>
                        <input
                            type="date"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            value={formData.dateReceived}
                            onChange={(e) => setFormData({ ...formData, dateReceived: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Display Order
                        </label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            value={formData.displayOrder}
                            onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                            placeholder="0"
                        />
                        <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image {!id && '*'}
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="max-w-full h-64 object-contain border border-gray-300 rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/awards')}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : id ? 'Update Award' : 'Create Award'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
