import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Award, Globe, Users, ShoppingBag, TestTube, Wrench, GraduationCap, MessageCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import diamondImg from '../assets/kal_asset/gemstones/Diamond.jpg';
import rubyImg from '../assets/kal_asset/gemstones/ruby.jpg';
import sapphireImg from '../assets/kal_asset/gemstones/Sapphire.jpg';
import emeraldImg from '../assets/kal_asset/gemstones/Emerald.jpg';

export default function GemstonHomepage() {
   const [currentTestimonial, setCurrentTestimonial] = useState(0);
   const [showHeroText, setShowHeroText] = useState(false);
   const [allowScroll, setAllowScroll] = useState(false);
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

    // Prevent scrolling with wheel
    window.addEventListener('wheel', handleWheel, { passive: false });
    // Prevent scrolling with touch
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [showHeroText, allowScroll]);

  const services = [
    { id: "buying-selling", icon: ShoppingBag, title: t.buyGemstones, desc: t.buyDesc },
    { id: "buying-selling", icon: Award, title: t.sellGemstones, desc: t.sellDesc },
    { id: "gemstone-testing", icon: TestTube, title: t.gemstoneTesting, desc: t.testingDesc },
    { id: "machines", icon: Wrench, title: t.equipmentTools, desc: t.equipmentDesc },
    { id: "courses", icon: GraduationCap, title: t.trainingCourses, desc: t.trainingDesc },
    { id: "buying-selling", icon: MessageCircle, title: t.consultation, desc: t.consultationDesc }
  ];

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


  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Gemstone" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 
                className={`text-5xl md:text-7xl font-bold text-white mb-6 transition-all duration-700 ${
                  showHeroText ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
              >
                {t.heroTitle}
              </h1>
              <div className="flex flex-wrap gap-4">
                <Link to="/gemstones">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105 shadow-xl">
                    {t.browseGemstones}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.ourServices}</h2>
              <p className="text-xl text-gray-600">{t.servicesSubtitle}</p>
            </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Link key={idx} to={`/services#${service.id}`} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer group">
                <service.icon className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                  {t.learnMore} <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gemstones */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.featuredGemstones}</h2>
              <p className="text-xl text-gray-600">{t.featuredSubtitle}</p>
            </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGems.map((gem, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={gem.image} 
                    alt={gem.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {t.newLabel}
                  </div>
                </div>
                <div className="p-6">
                   <h3 className="text-xl font-bold text-gray-900 mb-2">{gem.carat}</h3>
                   <p className="text-gray-600 mb-4">{gem.name}</p>
                   <div className="flex justify-center">
                     <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition">
                       {t.viewDetails}
                     </button>
                   </div>
                 </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/gemstones">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white px-10 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105">
                {t.viewAllGemstones}
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
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.testimonialTitle}</h2>
              <p className="text-xl text-gray-600">{t.testimonialSubtitle}</p>
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
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-12 rounded-3xl shadow-xl">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-xl text-gray-700 text-center mb-6 italic">
                      "{testimonial.text}"
                    </p>
                    <div className="text-center">
                      <p className="font-bold text-gray-900">{testimonial.author}</p>
                      <p className="text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`w-3 h-3 rounded-full transition ${
                      idx === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300'
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
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Customer Experiences
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                  className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <div className="p-2">
                      <iframe
                        src={getEmbedUrl(video.url)}
                        frameBorder="0"
                        allowFullScreen
                        className="rounded-xl w-full h-64 sm:h-80 md:h-96"
                        title={video.title}
                      ></iframe>
                    </div>
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Video {idx + 1}
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="text-gray-700 text-sm leading-relaxed">
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