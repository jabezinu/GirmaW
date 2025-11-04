import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown, Star, Heart, ShoppingCart, Eye, Languages } from 'lucide-react';

export default function GemstonesPage() {
  const [language, setLanguage] = useState('am');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);

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

  const gemstones = [
    {
      id: 1,
      name: t.blueSapphire,
      category: "precious",
      carat: "3.5ct",
      origin: t.ceylon,
      price: 2500,
      image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80",
      certified: true,
      isNew: true,
      rating: 5
    },
    {
      id: 2,
      name: t.ruby,
      category: "precious",
      carat: "2.8ct",
      origin: t.burma,
      price: 3200,
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80",
      certified: true,
      isNew: true,
      rating: 5
    },
    {
      id: 3,
      name: t.emerald,
      category: "precious",
      carat: "4.2ct",
      origin: t.colombia,
      price: 2800,
      image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&q=80",
      certified: true,
      isNew: false,
      rating: 5
    },
    {
      id: 4,
      name: t.pinkTourmaline,
      category: "semi-precious",
      carat: "5.1ct",
      origin: t.brazil,
      price: 1500,
      image: "https://images.unsplash.com/photo-1583937443569-f14e8aaaebc3?w=600&q=80",
      certified: true,
      isNew: false,
      rating: 4
    },
    {
      id: 5,
      name: t.aquamarine,
      category: "semi-precious",
      carat: "6.3ct",
      origin: t.pakistan,
      price: 1800,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
      certified: true,
      isNew: true,
      rating: 5
    },
    {
      id: 6,
      name: t.amethyst,
      category: "semi-precious",
      carat: "8.5ct",
      origin: t.uruguay,
      price: 950,
      image: "https://images.unsplash.com/photo-1611095564854-f84fe1b949ef?w=600&q=80",
      certified: true,
      isNew: false,
      rating: 4
    },
    {
      id: 7,
      name: t.yellowSapphire,
      category: "precious",
      carat: "4.0ct",
      origin: t.ceylon,
      price: 2200,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
      certified: true,
      isNew: false,
      rating: 5
    },
    {
      id: 8,
      name: t.tanzanite,
      category: "semi-precious",
      carat: "3.8ct",
      origin: t.tanzania,
      price: 1900,
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80",
      certified: true,
      isNew: true,
      rating: 5
    },
    {
      id: 9,
      name: t.garnet,
      category: "semi-precious",
      carat: "5.5ct",
      origin: t.madagascar,
      price: 850,
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80",
      certified: false,
      isNew: false,
      rating: 4
    },
    {
      id: 10,
      name: t.citrine,
      category: "semi-precious",
      carat: "7.2ct",
      origin: t.brazil,
      price: 680,
      image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80",
      certified: true,
      isNew: false,
      rating: 4
    },
    {
      id: 11,
      name: t.topaz,
      category: "semi-precious",
      carat: "6.8ct",
      origin: t.brazil,
      price: 1200,
      image: "https://images.unsplash.com/photo-1589674781759-c25c9e0eb43d?w=600&q=80",
      certified: true,
      isNew: false,
      rating: 4
    },
    {
      id: 12,
      name: t.peridot,
      category: "semi-precious",
      carat: "5.0ct",
      origin: t.pakistan,
      price: 750,
      image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80",
      certified: false,
      isNew: false,
      rating: 4
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const toggleLanguage = () => {
    setLanguage(language === 'am' ? 'en' : 'am');
  };

  // Filter and sort logic
  const filteredGemstones = gemstones.filter(gem => {
    const matchesSearch = gem.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || gem.category === selectedCategory;
    const matchesOrigin = selectedOrigin === 'all' || gem.origin === selectedOrigin;

    let matchesPrice = true;
    if (priceRange === 'under1000') matchesPrice = gem.price < 1000;
    else if (priceRange === '1000-3000') matchesPrice = gem.price >= 1000 && gem.price <= 3000;
    else if (priceRange === '3000-5000') matchesPrice = gem.price >= 3000 && gem.price <= 5000;
    else if (priceRange === 'above5000') matchesPrice = gem.price > 5000;

    return matchesSearch && matchesCategory && matchesOrigin && matchesPrice;
  });

  const sortedGemstones = [...filteredGemstones].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return b.isNew - a.isNew;
    return 0; // featured (default order)
  });

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedOrigin('all');
    setPriceRange('all');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleLanguage}
          className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition"
        >
          <Languages className="w-5 h-5" />
          <span className="font-semibold">{language === 'am' ? 'English' : 'አማርኛ'}</span>
        </button>
      </div>

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

            {/* Sort */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">{t.featured}</option>
                <option value="price-low">{t.priceLowToHigh}</option>
                <option value="price-high">{t.priceHighToLow}</option>
                <option value="newest">{t.newest}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Products Grid */}
        <main className="w-full">
            <div className="mb-6">
              <p className="text-gray-600">
                <span className="font-bold text-gray-900">{sortedGemstones.length}</span> {t.resultsFound}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedGemstones.map((gem) => (
                <div
                  key={gem.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={gem.image}
                      alt={gem.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                    />

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(gem.id)}
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(gem.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                        }`}
                      />
                    </button>

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
                      <span>{gem.carat}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
    </div>
  );
}