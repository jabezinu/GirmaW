import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import FullscreenImageViewer from './FullscreenImageViewer';

export default function GemstoneDetailModal({ gemstone, onClose }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showFullscreenViewer, setShowFullscreenViewer] = useState(false);

    if (!gemstone) return null;

    // Build the complete image gallery: main image first, then detail images
    const allImages = [];

    // Add main image (the same one shown on the card)
    if (gemstone.image) {
        allImages.push({ url: gemstone.image, label: 'Main Image' });
    }

    // Add detail images (galleryImages uploaded by admin)
    if (gemstone.galleryImages && gemstone.galleryImages.length > 0) {
        gemstone.galleryImages.forEach((url, index) => {
            allImages.push({ url, label: `Detail Image ${index + 1}` });
        });
    }

    const hasMultipleImages = allImages.length > 1;

    // Navigation functions
    const goToPrevious = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? allImages.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) =>
            prev === allImages.length - 1 ? 0 : prev + 1
        );
    };

    // Add keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            // Only handle keyboard navigation if fullscreen viewer is not open
            if (showFullscreenViewer) return;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    goToPrevious();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    goToNext();
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [showFullscreenViewer, currentImageIndex, allImages.length, goToPrevious, goToNext]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const openFullscreenViewer = () => {
        setShowFullscreenViewer(true);
    };

    const closeFullscreenViewer = () => {
        setShowFullscreenViewer(false);
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

                    {/* Image Gallery - Main Image + Detail Images */}
                    {allImages.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-blue-600">📸</span> Gemstone Images
                                {hasMultipleImages && (
                                    <span className="text-sm font-normal text-gray-500 ml-2">
                                        ({allImages.length} images)
                                    </span>
                                )}
                            </h3>
                            
                            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-xl">
                                {/* Main Image Display */}
                                <div className="relative h-96 md:h-[500px] flex items-center justify-center bg-gray-50">
                                    <img
                                        src={allImages[currentImageIndex]?.url}
                                        alt={`${gemstone.name} - ${allImages[currentImageIndex]?.label}`}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                    
                                    {/* Image Label Badge */}
                                    <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {allImages[currentImageIndex]?.label}
                                    </div>

                                    {/* Fullscreen Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openFullscreenViewer();
                                        }}
                                        className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors shadow-lg"
                                        aria-label="View fullscreen"
                                    >
                                        <Expand className="w-6 h-6" />
                                    </button>

                                    {/* Navigation Arrows */}
                                    {hasMultipleImages && (
                                        <>
                                            <button
                                                onClick={goToPrevious}
                                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors shadow-lg"
                                                aria-label="Previous image"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button
                                                onClick={goToNext}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors shadow-lg"
                                                aria-label="Next image"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Thumbnail Strip */}
                                {hasMultipleImages && (
                                    <div className="bg-gray-800 p-4">
                                        <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
                                            {allImages.map((img, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-3 transition-all ${
                                                        index === currentImageIndex
                                                            ? 'border-blue-400 shadow-lg ring-2 ring-blue-400'
                                                            : 'border-gray-600 hover:border-gray-400'
                                                    }`}
                                                >
                                                    <img
                                                        src={img.url}
                                                        alt={img.label}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {hasMultipleImages && (
                                <p className="text-sm text-gray-600 text-center">
                                    {currentImageIndex + 1} of {allImages.length} images • Use ← → arrow keys, click arrows, or thumbnails to navigate
                                </p>
                            )}
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

                    {/* If no images and no detailed information */}
                    {allImages.length === 0 &&
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

            {/* Fullscreen Image Viewer */}
            {showFullscreenViewer && (
                <FullscreenImageViewer
                    images={allImages}
                    initialIndex={currentImageIndex}
                    onClose={closeFullscreenViewer}
                />
            )}
        </div>
    );
}
