import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Award, Sparkles, X } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import diamondImg from '../assets/kal_asset/gemstones/Diamond.jpg';
import rubyImg from '../assets/kal_asset/gemstones/ruby.jpg';
import sapphireImg from '../assets/kal_asset/gemstones/Sapphire.jpg';
import emeraldImg from '../assets/kal_asset/gemstones/Emerald.jpg';
import heroVideo from '../assets/kal_asset/video/View of Diamonds Footage l Free Stock Footage _ No Copyright Videos _ Creative Common !.mp4';

export default function GemstonHomepage() {
   const [currentTestimonial, setCurrentTestimonial] = useState(0);
   const [showHeroText, setShowHeroText] = useState(false);
   const [allowScroll, setAllowScroll] = useState(false);
   const [showOpalModal, setShowOpalModal] = useState(false);
   const { comments, videos, loading } = useData();
 
   // Function to convert video URLs to embed format
   const getEmbedUrl = (url) => {
     if (!url) return '';
 
     // TikTok embed
     if (url.includes('tiktok.com')) {
       const match = url.match(/\/video\/(\d+)/);
       if (match) {
         return `https://www.tiktok.com/embed/v2/${match[1]}?hide_related=1`;
       }
     }
 
     // YouTube embed
     if (url.includes('youtube.com') || url.includes('youtu.be')) {
       let videoId = '';
       if (url.includes('youtube.com/watch?v=')) {
         videoId = url.split('v=')[1]?.split('&')[0];
       } else if (url.includes('youtu.be/')) {
         videoId = url.split('youtu.be/')[1]?.split('?')[0];
       }
       if (videoId) {
         return `https://www.youtube.com/embed/${videoId}`;
       }
     }
 
     // If it's already an embed URL, return as is
     if (url.includes('/embed/') || url.includes('embed/v2/')) {
       return url;
     }
 
     // Fallback: return original URL
     return url;
   };

  // English text constants
  const t = {
    heroTitle: "GirmaWondimu - We Sell Beauty",
    browseGemstones: "Ethiopian Opal",
    ourServices: "Our Services",
    servicesSubtitle: "Complete solutions for all your gemstone needs",
    buyGemstones: "Buy Gemstones",
    buyDesc: "Premium quality stones for retail & wholesale",
    sellGemstones: "Sell Your Gemstones",
    sellDesc: "Fair prices, quick evaluation",
    gemstoneTesting: "Gemstone Testing",
    testingDesc: "Professional authentication & grading",
    equipmentTools: "Equipment & Tools",
    equipmentDesc: "Professional machinery for your business",
    trainingCourses: "Training Courses",
    trainingDesc: "Learn from industry experts",
    consultation: "Consultation",
    consultationDesc: "Expert guidance for your business",
    learnMore: "Learn More",
    featuredGemstones: "Featured Gemstones",
    featuredSubtitle: "Handpicked selections from our premium collection",
    diamond: "Diamond",
    ruby: "Ruby",
    sapphire: "Sapphire",
    emerald: "Emerald",
    ceylon: "Ceylon",
    burma: "Burma",
    colombia: "Colombia",
    brazil: "Brazil",
    pakistan: "Pakistan",
    uruguay: "Uruguay",
    newLabel: "New",
    viewDetails: "View Details",
    viewAllGemstones: "View All Gemstones",
    gemstonesSold: "Gemstones Sold",
    businessesServed: "Businesses Served",
    countriesReached: "Countries Reached",
    studentsTrained: "Students Trained",
    testimonialTitle: "What Our Clients Say",
    testimonialSubtitle: "Trusted by thousands worldwide"
  };

  const heroImage = 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1920&q=80';

  // Map comments to testimonials format
  const testimonials = useMemo(() => {
    return comments.map(comment => ({
      _id: comment._id,
      text: comment.message,
      author: comment.name,
      location: comment.location || 'Unknown Location',
      rating: comment.rating || 5
    }));
  }, [comments]);

  const testimonialsLoading = loading.comments;
  const videosLoading = loading.videos;

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      if (testimonials.length > 0) {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }
    }, 6000);

    return () => {
      clearInterval(testimonialTimer);
    };
  }, [testimonials.length]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showOpalModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showOpalModal]);

  // Handle scroll to show hero text with two-stage behavior
  useEffect(() => {
    const handleWheel = (e) => {
      if (!showHeroText) {
        // First scroll: prevent default and show hero text
        e.preventDefault();
        setShowHeroText(true);
        // Allow scrolling after animation completes
        setTimeout(() => {
          setAllowScroll(true);
        }, 700); // Match the transition duration
      } else if (!allowScroll) {
        // During animation: prevent scrolling
        e.preventDefault();
      }
      // After animation: normal scrolling (no preventDefault)
    };

    const handleTouchMove = (e) => {
      if (!showHeroText || !allowScroll) {
        e.preventDefault();
      }
    };

    const handleScroll = () => {
      // Reset hero text when scrolled back to top
      if (window.scrollY === 0 && showHeroText) {
        setShowHeroText(false);
        setAllowScroll(false);
      }
    };

    // Prevent scrolling with wheel
    window.addEventListener('wheel', handleWheel, { passive: false });
    // Prevent scrolling with touch
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    // Monitor scroll position to reset at top
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showHeroText, allowScroll]);

  const featuredGems = [
    { name: t.diamond, carat: "3.0ct", origin: "Botswana", price: "$3,500", image: diamondImg },
    { name: t.ruby, carat: "2.8ct", origin: t.burma, price: "$3,200", image: rubyImg },
    { name: t.sapphire, carat: "3.5ct", origin: t.ceylon, price: "$2,500", image: sapphireImg },
    { name: t.emerald, carat: "4.2ct", origin: t.colombia, price: "$2,800", image: emeraldImg }
  ];

  const stats = [
    // { number: "10,000+", label: t.gemstonesSold },
    { number: "500+", label: t.businessesServed },
    { number: "50+", label: t.countriesReached },
    { number: "2,000+", label: t.studentsTrained }
  ];

  // Ethiopian Opal Modal Content
  const ethiopianOpalInfo = {
    title: "Ethiopian Opal",
    subtitle: "The Rainbow Gem of Ancient Kingdoms",
    history: [
      {
        period: "Ancient Times",
        text: "Ethiopian opals have been treasured since ancient times, though they were officially discovered in the Wollo Province in 1994. These precious stones were believed to possess mystical powers and were used in royal ceremonies."
      },
      {
        period: "Modern Discovery",
        text: "The modern opal deposits in Ethiopia were discovered in the 1990s, with major finds in Welo (Wollo) Province in 2008. These opals quickly gained international recognition for their exceptional play-of-color and transparency."
      }
    ],
    royalUsage: [
      {
        title: "Emperor Haile Selassie",
        description: "As emperor of Ethiopia (1930–74), Haile Selassie I was known for modernizing his country, for helping to establish the Organization of African Unity (now the African Union) in 1963, for his exile (1936–41), and for being overthrown in 1974.",
        era: "1837-1901"
      },
      {
        title: "Menelik II",
        description: "Menelik founded the first modern bank in Ethiopia, the Bank of Abyssinia, introduced the first modern postal system, signed the agreement and initiated work that established the Addis Ababa –Djibouti railway with the French, introduced electricity to Addis Ababa, as well as the telephone, telegraph, the motor",
        era: "Early 1800s"
      },
      {
        title: "Ethiopian Royalty",
        description: "Ethiopian emperors and empresses adorned themselves with opals during coronation ceremonies, believing the stones connected them to divine power and brought prosperity to their reign.",
        era: "Various Dynasties"
      }
    ],
    characteristics: [
      "Exceptional play-of-color with vibrant flashes",
      "Hydrophane property - can absorb water",
      "Ranges from transparent to translucent",
      "Colors include white, crystal, brown, and rare black",
      "Found primarily in Wollo and Shewa provinces"
    ],
    images: [
      "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800&q=80",
      "https://images.unsplash.com/photo-1583937443566-6e8a2f6d8e0f?w=800&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
    ]
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Ethiopian Opal Modal */}
      {showOpalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-gradient-to-br from-white via-purple-50/30 to-cyan-50/30 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-200/50">
            {/* Close Button */}
            <button
              onClick={() => setShowOpalModal(false)}
              className="sticky top-4 right-4 float-right z-10 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Sparkles className="w-10 h-10 text-purple-500 animate-pulse" />
                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                    {ethiopianOpalInfo.title}
                  </h2>
                  <Sparkles className="w-10 h-10 text-orange-500 animate-pulse" />
                </div>
                <p className="text-xl md:text-2xl text-slate-600 italic">{ethiopianOpalInfo.subtitle}</p>
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {ethiopianOpalInfo.images.map((img, idx) => (
                  <div key={idx} className="relative group overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={img}
                      alt={`Ethiopian Opal ${idx + 1}`}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ))}
              </div>

              {/* History Section */}
              <div className="mb-12">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                  <Sparkles className="w-7 h-7 text-purple-600" />
                  Historical Significance
                </h3>
                <div className="space-y-6">
                  {ethiopianOpalInfo.history.map((period, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200/50 shadow-lg">
                      <h4 className="text-xl font-bold text-purple-800 mb-3">{period.period}</h4>
                      <p className="text-slate-700 leading-relaxed">{period.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Royal Usage Section */}
              <div className="mb-12">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-700 to-orange-700 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                  <Star className="w-7 h-7 text-pink-600 fill-pink-600" />
                  Royal Heritage
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {ethiopianOpalInfo.royalUsage.map((royal, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 p-6 rounded-2xl border border-pink-200/50 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                        <h4 className="text-xl font-bold bg-gradient-to-r from-pink-700 to-orange-700 bg-clip-text text-transparent">
                          {royal.title}
                        </h4>
                      </div>
                      <p className="text-sm text-purple-600 font-semibold mb-3">{royal.era}</p>
                      <p className="text-slate-700 leading-relaxed">{royal.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Characteristics Section */}
              <div className="mb-8">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-purple-700 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                  <Award className="w-7 h-7 text-orange-600" />
                  Unique Characteristics
                </h3>
                <div className="bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 p-8 rounded-2xl border border-orange-200/50 shadow-xl">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ethiopianOpalInfo.characteristics.map((char, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-slate-700 font-medium">{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <Link to="/gemstones">
                  <button
                    onClick={() => setShowOpalModal(false)}
                    className="relative group bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 text-white px-12 py-5 rounded-full text-lg font-bold transition-all duration-500 transform hover:scale-110 shadow-2xl shadow-purple-500/50 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Explore Our Opal Collection
                      <ChevronRight className="w-5 h-5" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex-1 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl">
                <div className={`transition-all duration-700 ${
                  showHeroText ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}>
                  {/* Company Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-cyan-400 animate-pulse" />
                    <h1 
                      className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 bg-clip-text text-transparent"
                      style={{ textShadow: '0 0 40px rgba(34, 211, 238, 0.6)' }}
                    >
                      GirmaWondimu
                    </h1>
                    <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-purple-400 animate-pulse" />
                  </div>
                  
                  {/* Motto */}
                  <div className="flex items-center gap-3 ml-2">
                    <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                    <p className="text-2xl md:text-4xl font-light text-cyan-100 italic tracking-wide">
                      We Sell Beauty
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pb-12 md:pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setShowOpalModal(true)}
                    className="relative group bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white px-10 py-5 rounded-full text-lg font-bold transition-all duration-500 transform hover:scale-110 shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-400/70 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      {t.browseGemstones}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 opacity-30 blur-lg animate-pulse" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gemstones */}
      <section className="py-20 bg-gradient-to-br from-white via-purple-50/30 to-cyan-50/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,211,238,0.1),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">{t.featuredGemstones}</h2>
                <Sparkles className="w-8 h-8 text-cyan-500 animate-pulse" />
              </div>
              <p className="text-xl text-slate-600">{t.featuredSubtitle}</p>
            </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGems.map((gem, idx) => (
              <div
                key={idx}
                className="relative bg-gradient-to-br from-white via-cyan-50/50 to-purple-50/50 rounded-3xl overflow-hidden border border-cyan-200/60 shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 cursor-pointer group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-blue-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative overflow-hidden">
                  <img 
                    src={gem.image} 
                    alt={gem.name}
                    className="w-full h-64 object-cover group-hover:scale-125 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-cyan-500/50 flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    {t.newLabel}
                  </div>
                </div>
                <div className="relative p-6 z-10">
                   <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-700 via-blue-700 to-purple-800 bg-clip-text text-transparent mb-2">{gem.carat}</h3>
                   <p className="text-slate-600 mb-4 font-semibold">{gem.name}</p>
                   <div className="flex justify-center">
                     <button className="relative group/btn bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-600 text-white px-8 py-3 rounded-full text-sm font-bold transition-all duration-500 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-blue-500/40 overflow-hidden">
                       <span className="relative z-10">{t.viewDetails}</span>
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                     </button>
                   </div>
                 </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/gemstones">
              <button className="relative group bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-600 text-white px-12 py-5 rounded-full text-lg font-bold transition-all duration-500 transform hover:scale-110 shadow-2xl shadow-cyan-500/40 hover:shadow-blue-500/60 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  {t.viewAllGemstones}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 opacity-30 blur-xl animate-pulse" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      {/* <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.15),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.15),transparent_40%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Star className="w-8 h-8 text-cyan-500 fill-cyan-500 animate-pulse" />
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 bg-clip-text text-transparent">{t.testimonialTitle}</h2>
                <Star className="w-8 h-8 text-purple-500 fill-purple-500 animate-pulse" />
              </div>
              <p className="text-xl text-slate-600">{t.testimonialSubtitle}</p>
            </div>

          {testimonialsLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : testimonials.length > 0 ? (
            <div className="relative">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={testimonial._id || idx}
                  className={`transition-opacity duration-500 ${
                    idx === currentTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                >
                  <div className="relative bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 p-12 rounded-3xl border border-cyan-200/60 shadow-2xl shadow-cyan-500/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-blue-400/5 to-purple-500/5 animate-pulse" />
                    <div className="relative z-10">
                      <div className="flex justify-center mb-6 gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-7 h-7 text-yellow-400 fill-yellow-400 drop-shadow-lg animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                      </div>
                      <p className="text-xl text-slate-700 text-center mb-6 italic font-medium leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <div className="text-center">
                        <p className="font-bold text-lg bg-gradient-to-r from-cyan-700 via-blue-700 to-purple-800 bg-clip-text text-transparent">{testimonial.author}</p>
                        <p className="text-slate-600 font-medium">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`h-3 rounded-full transition-all duration-500 ${
                      idx === currentTestimonial ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 w-10 shadow-lg shadow-cyan-500/50' : 'bg-slate-300 w-3 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No testimonials available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Customer Videos */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Customer Experiences
              </h2>
              <Sparkles className="w-8 h-8 text-cyan-500 animate-pulse" />
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Watch real stories from our satisfied customers sharing their gemstone journey
            </p>
          </div>

          {videosLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, idx) => (
                <div
                  key={video._id}
                  className="relative bg-gradient-to-br from-white via-purple-50/50 to-cyan-50/50 rounded-3xl border border-purple-200/60 shadow-2xl overflow-hidden transform hover:scale-105 hover:-translate-y-2 hover:shadow-purple-500/30 transition-all duration-500 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-blue-400/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative overflow-hidden">
                    <div className="p-3">
                      <iframe
                        src={getEmbedUrl(video.url)}
                        frameBorder="0"
                        allowFullScreen
                        className="rounded-2xl w-full h-64 sm:h-80 md:h-96 shadow-lg"
                        title={video.title}
                      ></iframe>
                    </div>
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl shadow-purple-500/50 flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      Video {idx + 1}
                    </div>
                  </div>
                  <div className="relative p-6 bg-gradient-to-r from-purple-50/80 via-blue-50/80 to-cyan-50/80 z-10">
                    <h3 className="text-lg font-bold bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-700 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {video.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos available</h3>
              <p className="text-gray-600">Check back soon for customer testimonials and experiences.</p>
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.ourProcess}</h2>
            <p className="text-xl text-gray-600">{t.processSubtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.step1Title}</h3>
              <p className="text-gray-600">{t.step1Desc}</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.step2Title}</h3>
              <p className="text-gray-600">{t.step2Desc}</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.step3Title}</h3>
              <p className="text-gray-600">{t.step3Desc}</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.step4Title}</h3>
              <p className="text-gray-600">{t.step4Desc}</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}