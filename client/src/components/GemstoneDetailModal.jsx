import React from 'react';
import { X } from 'lucide-react';

export default function GemstoneDetailModal({ gemstone, onClose }) {
    if (!gemstone) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeIn">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-6 rounded-t-3xl flex justify-between items-center z-10">
                    <h2 className="text-3xl font-bold">{gemstone.name}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-xl">
                            <p className="text-sm font-medium text-blue-600 mb-1">Category</p>
                            <p className="text-lg font-bold text-gray-900 capitalize">{gemstone.category}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl">
                            <p className="text-sm font-medium text-purple-600 mb-1">Quality</p>
                            <p className="text-lg font-bold text-gray-900 capitalize">{gemstone.quality}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl">
                            <p className="text-sm font-medium text-green-600 mb-1">Hardness</p>
                            <p className="text-lg font-bold text-gray-900">{gemstone.hardness}</p>
                        </div>
                    </div>

                    {/* Main Photo */}
                    {gemstone.mainPhoto && (
                        <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-gray-900">High-Quality Image</h3>
                            <div className="relative group">
                                <img
                                    src={gemstone.mainPhoto}
                                    alt={`${gemstone.name} detail`}
                                    className="w-full h-auto rounded-2xl shadow-lg object-cover max-h-[500px]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </div>
                    )}

                    {/* 360 Video */}
                    {gemstone.video360 && (
                        <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-gray-900">360° View</h3>
                            <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                                <video
                                    src={gemstone.video360}
                                    controls
                                    className="w-full h-auto"
                                    poster={gemstone.mainPhoto || gemstone.image}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    )}

                    {/* Detail Sections */}
                    {gemstone.detailSections && gemstone.detailSections.length > 0 && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900">Detailed Information</h3>
                            {gemstone.detailSections.map((section, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200 shadow-sm"
                                >
                                    {section.title && (
                                        <h4 className="text-xl font-semibold text-gray-800 mb-3">{section.title}</h4>
                                    )}
                                    {section.content && (
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{section.content}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* If no detailed information */}
                    {!gemstone.mainPhoto && !gemstone.video360 && (!gemstone.detailSections || gemstone.detailSections.length === 0) && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Additional Details</h3>
                            <p className="text-gray-600">
                                Detailed information for this gemstone has not been added yet.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-50 px-8 py-4 rounded-b-3xl flex justify-end border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
