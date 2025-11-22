import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import toast from 'react-hot-toast';
import GemstoneDetailModal from '../components/GemstoneDetailModal';

export default function GemstonesPage() {
  const { gemstones, loading: dataLoading, errors, refreshGemstones } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGemstone, setSelectedGemstone] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const loading = dataLoading.gemstones;
  const error = errors.gemstones;

  // English text constants
  const t = {
    pageTitle: "Our Gemstone Collection",
    pageSubtitle: "Explore premium quality gemstones sourced from around the world",
    searchPlaceholder: "Search gemstones...",
    filters: "Filters",
    clearFilters: "Clear Filters",
    category: "Category",
    allCategories: "All Categories",
    precious: "Precious Stones",
    semiPrecious: "Semi-Precious",
    organic: "Organic",
    origin: "Origin",
    allOrigins: "All Countries",
    priceRange: "Price Range",
    allPrices: "All Prices",
    under1000: "Under $1,000",
    range1000to3000: "$1,000 - $3,000",
    range3000to5000: "$3,000 - $5,000",
    above5000: "Above $5,000",
    sortBy: "Sort By",
    featured: "Featured",
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",
    newest: "Newest",
    resultsFound: "Results Found",
    viewDetails: "View Details",
    addToCart: "Add to Cart",
    certified: "Certified",
    new: "New",
    blueSapphire: "Blue Sapphire",
    ruby: "Ruby",
    emerald: "Emerald",
    pinkTourmaline: "Pink Tourmaline",
    aquamarine: "Aquamarine",
    amethyst: "Amethyst",
    yellowSapphire: "Yellow Sapphire",
    tanzanite: "Tanzanite",
    garnet: "Garnet",
    citrine: "Citrine",
    topaz: "Blue Topaz",
    peridot: "Peridot",
    ceylon: "Ceylon",
    burma: "Burma",
    colombia: "Colombia",
    brazil: "Brazil",
    pakistan: "Pakistan",
    uruguay: "Uruguay",
    madagascar: "Madagascar",
    tanzania: "Tanzania",
    thailand: "Thailand",
    australia: "Australia"
  };

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error('Failed to load gemstones. Please try again later.');
    }
  }, [error]);

  // Map gemstone data with translations
  const translatedGemstones = gemstones.map(gem => ({
    ...gem,
    name: t[gem.nameKey] || gem.nameKey
  }));

  // Filter and sort logic
  const filteredGemstones = translatedGemstones.filter(gem => {
    const matchesSearch = gem.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || gem.category === selectedCategory;
    const matchesQuality = selectedQuality === 'all' || gem.quality === selectedQuality;

    return matchesSearch && matchesCategory && matchesQuality;
  });

  const sortedGemstones = [...filteredGemstones];

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedQuality('all');
    setSearchTerm('');
  };

  const handleViewDetails = (gemstone) => {
    setSelectedGemstone(gemstone);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedGemstone(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Search and Filters Bar */}
      <div className="bg-white shadow-md sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Toggle Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              <Filter className="w-5 h-5" />
              {t.filters}
            </button>

            {/* Quality Filter */}
            <div className="flex items-center gap-4">
              <select
                value={selectedQuality}
                onChange={(e) => setSelectedQuality(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Qualities</option>
                <option value="affordable">Affordable Gemstone </option>
                <option value="commercial">Commercial-quality Gemstone </option>
                <option value="luxury">Luxury Gemstone </option>
              </select>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Products Grid */}
        <main className="w-full">
          {loading && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              </div>
              <p className="text-gray-600">Loading gemstones...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <div className="text-red-400 mb-4">
                <X className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-red-600 mb-4">Failed to load gemstones</p>
              <button
                onClick={refreshGemstones}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  <span className="font-bold text-gray-900">{sortedGemstones.length}</span> {t.resultsFound}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedGemstones.map((gem) => (
                  <div
                    key={gem._id}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group relative"
                  >
                    <div className="relative overflow-hidden bg-gray-50 h-48 sm:h-64 flex items-center justify-center">
                      <img
                        src={gem.image}
                        alt={gem.name}
                        className="w-full h-full object-contain p-2 group-hover:scale-110 transition duration-500"
                        onError={(e) => {
                          // Fallback to a placeholder if image not found
                          e.target.src = `https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80`;
                        }}
                      />

                      {/* View Details Button - shown on hover */}
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          onClick={() => handleViewDetails(gem)}
                          className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg"
                        >
                          {t.viewDetails}
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{gem.name}</h3>

                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <span>Category: {gem.category}</span>
                        <span>Quality: {gem.quality}</span>
                      </div>

                      <div className="text-sm text-gray-600">
                        Hardness: {gem.hardness}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* No Results */}
          {sortedGemstones.length === 0 && !loading && !error && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Results Found
              </h3>
              <p className="text-gray-600 MB-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition"
              >
                {t.clearFilters}
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Gemstone Detail Modal */}
      {showDetailModal && selectedGemstone && (
        <GemstoneDetailModal
          gemstone={selectedGemstone}
          onClose={closeDetailModal}
        />
      )}

    </div>
  );
}
