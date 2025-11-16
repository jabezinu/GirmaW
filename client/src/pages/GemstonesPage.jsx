import React, { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronDown, Star, Heart, ShoppingCart, Eye, Languages, Plus, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';

export default function GemstonesPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [gemstones, setGemstones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingGemstone, setEditingGemstone] = useState(null);

  const translations = {
    am: {
      pageTitle: "የእኛ እንቁዎች ስብስብ",
      pageSubtitle: "ከመላው አለም የተመረጡ ፕሪሚየም ጥራት ያላቸው እንቁዎችን ያስሱ",
      searchPlaceholder: "እንቁዎችን ይፈልጉ...",
      filters: "ማጣሪያዎች",
      clearFilters: "ማጣሪያዎችን አጽዳ",
      category: "ምድብ",
      allCategories: "ሁሉም ምድቦች",
      precious: "ውድ እንቁዎች",
      semiPrecious: "ከፊል ውድ እንቁዎች",
      organic: "ኦርጋኒክ",
      origin: "መነሻ",
      allOrigins: "ሁሉም አገሮች",
      priceRange: "የዋጋ ክልል",
      allPrices: "ሁሉም ዋጋዎች",
      under1000: "ከ $1,000 በታች",
      range1000to3000: "$1,000 - $3,000",
      range3000to5000: "$3,000 - $5,000",
      above5000: "ከ $5,000 በላይ",
      sortBy: "ደርድር በ",
      featured: "የተመረጡ",
      priceLowToHigh: "ዋጋ: ዝቅተኛ ወደ ከፍተኛ",
      priceHighToLow: "ዋጋ: ከፍተኛ ወደ ዝቅተኛ",
      newest: "አዲስ",
      resultsFound: "ውጤቶች ተገኝተዋል",
      viewDetails: "ዝርዝሮችን ይመልከቱ",
      addToCart: "ወደ ጋሪ አክል",
      certified: "የተረጋገጠ",
      new: "አዲስ",
      // Gemstone names
      blueSapphire: "ሰማያዊ ሰፋየር",
      ruby: "ሩቢ",
      emerald: "ኤመራልድ",
      pinkTourmaline: "ሮዝ ቱርማሊን",
      aquamarine: "አኳማሪን",
      amethyst: "አሜቲስት",
      yellowSapphire: "ቢጫ ሰፋየር",
      tanzanite: "ታንዛኒት",
      garnet: "ጋርኔት",
      citrine: "ሲትሪን",
      topaz: "ቶፓዝ",
      peridot: "ፔሪዶት",
      // Origins
      ceylon: "ሲላን",
      burma: "በርማ",
      colombia: "ኮሎምቢያ",
      brazil: "ብራዚል",
      pakistan: "ፓኪስታን",
      uruguay: "ኡራጓይ",
      madagascar: "ማዳጋስካር",
      tanzania: "ታንዛኒያ",
      thailand: "ታይላንድ",
      australia: "አውስትራሊያ"
    },
    en: {
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
      // Gemstone names
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
      // Origins
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
    }
  };

  const t = translations[language];

  // API base URL
  const API_BASE_URL = 'http://localhost:5000/api';

  // Fetch gemstones from API
  useEffect(() => {
    fetchGemstones();
  }, []);

  const fetchGemstones = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/gemstones`);
      setGemstones(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch gemstones');
      console.error('Error fetching gemstones:', err);
    } finally {
      setLoading(false);
    }
  };

  // Map gemstone data with translations
  const translatedGemstones = gemstones.map(gem => ({
    ...gem,
    name: t[gem.nameKey],
    origin: t[gem.originKey]
  }));

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };


  // CRUD functions
  const createGemstone = async (gemstoneData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/gemstones`, gemstoneData);
      setGemstones([...gemstones, response.data]);
      setShowCreateForm(false);
    } catch (err) {
      console.error('Error creating gemstone:', err);
      alert('Failed to create gemstone');
    }
  };

  const updateGemstone = async (id, gemstoneData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/gemstones/${id}`, gemstoneData);
      setGemstones(gemstones.map(gem => gem._id === id ? response.data : gem));
      setEditingGemstone(null);
    } catch (err) {
      console.error('Error updating gemstone:', err);
      alert('Failed to update gemstone');
    }
  };

  const deleteGemstone = async (id) => {
    if (!confirm('Are you sure you want to delete this gemstone?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/gemstones/${id}`);
      setGemstones(gemstones.filter(gem => gem._id !== id));
    } catch (err) {
      console.error('Error deleting gemstone:', err);
      alert('Failed to delete gemstone');
    }
  };

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

              {/* Create Gemstone Button */}
              <button
                onClick={() => setShowCreateForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
              >
                <Plus className="w-5 h-5" />
                Add Gemstone
              </button>
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
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={fetchGemstones}
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
                        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={gem.image}
                            alt={gem.name}
                            className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                            onError={(e) => {
                              // Fallback to a placeholder if image not found
                              e.target.src = `https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80`;
                            }}
                          />

                          {/* Action Buttons */}
                          <div className="absolute top-4 right-4 flex gap-2">
                            <button
                              onClick={() => setEditingGemstone(gem)}
                              className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteGemstone(gem._id)}
                              className="bg-red-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toggleFavorite(gem._id)}
                              className="bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
                            >
                              <Heart
                                className={`w-5 h-5 ${
                                  favorites.includes(gem._id)
                                    ? 'fill-red-500 text-red-500'
                                    : 'text-gray-400'
                                }`}
                              />
                            </button>
                          </div>

                          {/* Quick View Overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-300 flex items-center justify-center">
                            <button className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition duration-300 flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              {t.viewDetails}
                            </button>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{gem.name}</h3>

                          <div className="flex items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < gem.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>

                          <div className="flex justify-between text-sm text-gray-600 mb-4">
                            <span>Hardness: {gem.hardness}</span>
                            <span className="capitalize">{gem.quality}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

            {/* No Results */}
            {sortedGemstones.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {language === 'am' ? 'ምንም ውጤት አልተገኘም' : 'No Results Found'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === 'am'
                    ? 'እባክዎን የፍለጋ ቃልዎን ይለውጡ ወይም ማጣሪያዎችን ያጽዱ'
                    : 'Try adjusting your search or filters'}
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

        {/* Create/Edit Gemstone Modal */}
        {(showCreateForm || editingGemstone) && (
          <GemstoneForm
            gemstone={editingGemstone}
            onSave={editingGemstone ? (data) => updateGemstone(editingGemstone._id, data) : createGemstone}
            onCancel={() => {
              setShowCreateForm(false);
              setEditingGemstone(null);
            }}
          />
        )}
    </div>
  );
}

// Gemstone Form Component
function GemstoneForm({ gemstone, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nameKey: gemstone?.nameKey || '',
    category: gemstone?.category || 'precious',
    quality: gemstone?.quality || 'luxury',
    hardness: gemstone?.hardness || '',
    originKey: gemstone?.originKey || '',
    price: gemstone?.price || '',
    image: gemstone?.image || '',
    certified: gemstone?.certified || false,
    isNew: gemstone?.isNew || false,
    rating: gemstone?.rating || 5
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">
          {gemstone ? 'Edit Gemstone' : 'Add New Gemstone'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name Key</label>
            <input
              type="text"
              name="nameKey"
              value={formData.nameKey}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="precious">Precious</option>
              <option value="semi-precious">Semi-Precious</option>
              <option value="organic">Organic</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Quality</label>
            <select
              name="quality"
              value={formData.quality}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="affordable">Affordable</option>
              <option value="commercial">Commercial</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Hardness</label>
            <input
              type="text"
              name="hardness"
              value={formData.hardness}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Origin Key</label>
            <input
              type="text"
              name="originKey"
              value={formData.originKey}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="certified"
                checked={formData.certified}
                onChange={handleChange}
                className="mr-2"
              />
              Certified
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={handleChange}
                className="mr-2"
              />
              New
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              {gemstone ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}