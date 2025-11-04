import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Star, Award, Globe, Users, ShoppingBag, TestTube, Wrench, GraduationCap, MessageCircle, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function GemstonHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1920&q=80',
    'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1920&q=80',
    'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1920&q=80'
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      text: "Outstanding quality and service. I've purchased multiple gemstones for my jewelry business and every stone has been authentic and beautiful.",
      rating: 5
    },
    {
      name: "Ahmed Al-Rahman",
      location: "Dubai, UAE",
      text: "Their testing service is impeccable. Fast, accurate, and professional. Highly recommended for wholesale buyers.",
      rating: 5
    },
    {
      name: "Maria Santos",
      location: "São Paulo, Brazil",
      text: "The training course was excellent! I learned so much about gemstone identification and grading. Worth every penny.",
      rating: 5
    }
  ];

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      clearInterval(heroTimer);
      clearInterval(testimonialTimer);
    };
  }, []);

  const services = [
    { icon: ShoppingBag, title: "Buy Gemstones", desc: "Premium quality stones for retail & wholesale" },
    { icon: Award, title: "Sell Your Gemstones", desc: "Fair prices, quick evaluation" },
    { icon: TestTube, title: "Gemstone Testing", desc: "Professional authentication & grading" },
    { icon: Wrench, title: "Equipment & Tools", desc: "Professional machinery for your business" },
    { icon: GraduationCap, title: "Training Courses", desc: "Learn from industry experts" },
    { icon: MessageCircle, title: "Consultation", desc: "Expert guidance for your business" }
  ];

  const featuredGems = [
    { name: "Blue Sapphire", carat: "3.5ct", origin: "Ceylon", price: "$2,500", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80" },
    { name: "Ruby", carat: "2.8ct", origin: "Burma", price: "$3,200", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80" },
    { name: "Emerald", carat: "4.2ct", origin: "Colombia", price: "$2,800", image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&q=80" },
    { name: "Pink Tourmaline", carat: "5.1ct", origin: "Brazil", price: "$1,500", image: "https://images.unsplash.com/photo-1583937443569-f14e8aaaebc3?w=400&q=80" },
    { name: "Aquamarine", carat: "6.3ct", origin: "Pakistan", price: "$1,800", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80" },
    { name: "Amethyst", carat: "8.5ct", origin: "Uruguay", price: "$950", image: "https://images.unsplash.com/photo-1611095564854-f84fe1b949ef?w=400&q=80" }
  ];

  const stats = [
    { number: "10,000+", label: "Gemstones Sold" },
    { number: "500+", label: "Businesses Served" },
    { number: "50+", label: "Countries Reached" },
    { number: "2,000+", label: "Students Trained" }
  ];

  const articles = [
    { title: "How to Identify Quality Gemstones", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80", excerpt: "Learn the key factors that determine gemstone quality..." },
    { title: "Gemstone Investment Guide 2024", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80", excerpt: "Discover which gemstones are trending in the market..." },
    { title: "Latest Industry Trends", image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&q=80", excerpt: "Stay updated with the newest developments in gemology..." }
  ];

  return (
    <div className="min-h-screen bg-white">


      {/* Hero Section */}
      <section className="relative h-screen mt-20 overflow-hidden">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentHeroImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={img} alt="Gemstone" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          </div>
        ))}
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
                Your Trusted Partner in Premium Gemstones
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                From Mine to Market - Complete Gemstone Solutions
              </p>
              <p className="text-lg text-gray-300 mb-10">
                Buying, Selling, Testing & Training - Serving Local & International Markets Since 2009
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105 shadow-xl">
                  Browse Gemstones
                </button>
                <button className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105 shadow-xl">
                  Get Quote
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105 shadow-xl">
                  Book Testing
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHeroImage(idx)}
              className={`w-3 h-3 rounded-full transition ${
                idx === currentHeroImage ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Quick Services Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Complete solutions for all your gemstone needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer group"
              >
                <service.icon className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                  Learn More <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gemstones */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Gemstones</h2>
            <p className="text-xl text-gray-600">Handpicked selections from our premium collection</p>
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
                    New
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{gem.name}</h3>
                  <div className="flex justify-between text-gray-600 mb-4">
                    <span>{gem.carat}</span>
                    <span>{gem.origin}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">{gem.price}</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white px-10 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105">
              View All Gemstones
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-xl text-blue-100">Your success is our priority</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">15+ Years</h3>
              <p className="text-blue-100">Industry Experience</p>
            </div>
            <div className="text-center">
              <Globe className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">50+ Countries</h3>
              <p className="text-blue-100">Global Reach</p>
            </div>
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">Expert Team</h3>
              <p className="text-blue-100">Certified Gemologists</p>
            </div>
            <div className="text-center">
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">100% Authentic</h3>
              <p className="text-blue-100">Quality Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Section */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80"
                alt="Business"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Wholesale & B2B Solutions</h2>
              <p className="text-xl text-gray-600 mb-8">
                Partner with us for your business gemstone needs. We provide comprehensive solutions tailored for wholesale buyers and business clients.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <ChevronRight className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Bulk purchasing options with competitive pricing</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Custom sourcing for specific requirements</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Professional testing services for your inventory</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Long-term business partnerships and support</span>
                </li>
              </ul>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105">
                Contact Our B2B Team
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Knowledge Hub */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Gemstone Knowledge Hub</h2>
            <p className="text-xl text-gray-600">Learn from industry experts</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer"
              >
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center text-blue-600 font-semibold hover:gap-2 transition-all">
                    Read More <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white px-10 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105">
              Explore All Resources
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Trusted by thousands worldwide</p>
          </div>
          
          <div className="relative">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
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
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
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
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600">Simple, transparent, and secure</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Browse/Contact</h3>
              <p className="text-gray-600">Explore our collection or reach out with your needs</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Consultation</h3>
              <p className="text-gray-600">Expert guidance on selection and specifications</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Testing</h3>
              <p className="text-gray-600">Professional authentication and certification</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delivery</h3>
              <p className="text-gray-600">Safe and secure shipping worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
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
      </section>

      {/* Footer */}

    </div>
  );
}