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
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
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
                    {/* Basic Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                            <p className="text-sm font-medium text-blue-600 mb-1">Category</p>
                            <p className="text-lg font-bold text-gray-900 capitalize">{gemstone.category}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                            <p className="text-sm font-medium text-purple-600 mb-1">Quality</p>
                            <p className="text-lg font-bold text-gray-900 capitalize">{gemstone.quality}</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                            <p className="text-sm font-medium text-green-600 mb-1">Hardness</p>
                            <p className="text-lg font-bold text-gray-900">{gemstone.hardness}</p>
                        </div>
                    </div>

                    {/* Images Gallery */}
                    {(gemstone.image || gemstone.mainPhoto) && (
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-blue-600">📸</span> Gemstone Gallery
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Main Photo - Larger display */}
                                {gemstone.mainPhoto && (
                                    <div className="md:col-span-2">
                                        <div className="relative group rounded-2xl overflow-hidden shadow-xl">
                                            <img
                                                src={gemstone.mainPhoto}
                                                alt={`${gemstone.name} - High Quality`}
                                                className="w-full h-auto max-h-[500px] object-contain bg-gray-100"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="absolute bottom-4 left-4 text-white">
                                                    <p className="text-sm font-semibold">High-Quality View</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Card Image */}
                                {gemstone.image && (
                                    <div className="relative group rounded-2xl overflow-hidden shadow-lg">
                                        <img
                                            src={gemstone.image}
                                            alt={`${gemstone.name} - Card View`}
                                            className="w-full h-64 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="absolute bottom-4 left-4 text-white">
                                                <p className="text-sm font-semibold">Card Preview</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* 360° Video */}
                    {gemstone.video360 && (
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-red-600">🎥</span> 360° Interactive View
                            </h3>
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl p-2">
                                <video
                                    src={gemstone.video360}
                                    controls
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
                                    className="w-full h-auto rounded-xl"
                                    poster={gemstone.mainPhoto || gemstone.image}
                                    onError={(e) => console.error('Video load error:', e)}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <p className="text-sm text-gray-600 text-center italic">
                                Use controls to explore the gemstone from all angles
                            </p>
                        </div>
                    )}

                    {/* Detail Sections / Description */}
                    {gemstone.detailSections && gemstone.detailSections.length > 0 && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-indigo-600">📝</span> Detailed Information
                            </h3>
                            <div className="space-y-4">
                                {gemstone.detailSections.map((section, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-200 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        {section.title && (
                                            <h4 className="text-xl font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                                                <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                    {index + 1}
                                                </span>
                                                {section.title}
                                            </h4>
                                        )}
                                        {section.content && (
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap pl-10">
                                                {section.content}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* If no detailed information */}
                    {!gemstone.mainPhoto &&
                        !gemstone.video360 &&
                        (!gemstone.detailSections || gemstone.detailSections.length === 0) && (
                            <div className="text-center py-12 bg-gray-50 rounded-2xl">
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
                <div className="sticky bottom-0 bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4 rounded-b-3xl flex justify-between items-center border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                        <p className="font-semibold">{gemstone.name}</p>
                        <p>{gemstone.category} • {gemstone.quality}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
