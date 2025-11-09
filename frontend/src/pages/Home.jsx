import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Award, Globe, Users, ShoppingBag, TestTube, Wrench, GraduationCap, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function GemstonHomepage() {
   const [currentHeroImage, setCurrentHeroImage] = useState(0);
   const [currentTestimonial, setCurrentTestimonial] = useState(0);
   const { language } = useLanguage();

  const translations = {
    am: {
      // Hero Section
      heroTitle: "ጳዝዮን - ለመአድን ንግዶ የታመነ አጋር",
      heroSubtitle: "ከማዕድን ቁፋሮ እስከ አለም አቀፍ ገበያ",
      heroDescription: "መግዛት፣ መሸጥ፣ መመርመር እና ስልጠና - ከ2009 ጀምሮ የሀገር ውስጥና አለም አቀፍ ገበያዎችን እናገለግላለን",
      browseGemstones: "መኣድናትን ለማየት",
      
      // Services Section
      ourServices: "የምንሰጣቸው አገልግሎቶች",
      // servicesSubtitle: "ለሁሉም የእንቁ ፍላጎቶችዎ ሙሉ መፍትሄዎች",
      buyGemstones: "እንቁዎችን ይግዙ",
      buyDesc: "የላቀ ጥራት ያላቸው መኣድናት",
      sellGemstones: "እንቁዎችዎን ይሽጡ",
      sellDesc: "መኣድናትን እንገዛለን",
      gemstoneTesting: "መአድን ምርመራ",
      testingDesc: "ፕሮፌሽናል ማረጋገጫ",
      equipmentTools: "መሳሪያዎች እና መገልገያዎች",
      equipmentDesc: "ለንግድዎ ፕሮፌሽናል ማሽነሪዎች",
      trainingCourses: "የስልጠና ኮርሶች",
      trainingDesc: "ከኢንዱስትሪ ባለሙያዎች ይማሩ",
      consultation: "ምክክር",
      consultationDesc: "ለንግድዎ የባለሙያ መመሪያ",
      learnMore: "ለተጨማሪ መረጃ",
      
      // Featured Gemstones
      featuredGemstones: "የተመረጡ እንቁዎች",
      featuredSubtitle: "ከእኛ ፕሪሚየም ስብስብ በእጅ የተመረጡ ምርጫዎች",
      blueSapphire: "ሰማያዊ ሰፋየር",
      ruby: "ሩቢ",
      emerald: "ኤመራልድ",
      pinkTourmaline: "ሮዝ ቱርማሊን",
      aquamarine: "አኳማሪን",
      amethyst: "አሜቲስት",
      ceylon: "ሲላን",
      burma: "በርማ",
      colombia: "ኮሎምቢያ",
      brazil: "ብራዚል",
      pakistan: "ፓኪስታን",
      uruguay: "ኡራጓይ",
      newLabel: "አዲስ",
      viewDetails: "ዝርዝሮችን ይመልከቱ",
      viewAllGemstones: "ሁሉንም እንቁዎች ይመልከቱ",
      
      // Stats
      gemstonesSold: "የተሸጡ እንቁዎች",
      businessesServed: "ግብይቶች",
      countriesReached: "የምንገበያይባቸው አገሮች",
      studentsTrained: "የሰለጠኑ ተማሪዎች",
      
      // Testimonials
      testimonialTitle: "የደንበኞቻችን አስተያየት",
      testimonialSubtitle: "በአለም ዙሪያ በሺዎች የሚተማመኑበት",
      testimonial1Name: "ሳራ ጆንሰን",
      testimonial1Location: "ኒው ዮርክ፣ አሜሪካ",
      testimonial1Text: "እጅግ በጣም ጥሩ ጥራት እና አገልግሎት። ለእኔ የጌጣጌጥ ንግድ በርካታ እንቁዎችን ገዛሁ እና እያንዳንዱ ድንጋይ እውነተኛ እና ቆንጆ ነበር።",
      testimonial2Name: "አህመድ አል-ራህማን",
      testimonial2Location: "ዱባይ፣ ኢማራት",
      testimonial2Text: "የእነርሱ የምርመራ አገልግሎት ጥሩ ነው። ፈጣን፣ ትክክለኛ እና ፕሮፌሽናል።",
      testimonial3Name: "ማሪያ ሳንቶስ",
      testimonial3Location: "ሳኦ ፓውሎ፣ ብራዚል",
      testimonial3Text: "የስልጠና ኮርሱ በጣም ጥሩ ነበር! ስለ መአድናት መለየት እና ደረጃ አሰጣጥ ብዙ ተማርኩ። እያንዳንዱ ሳንቲም ይገባዋል።",
      
      // Process
      ourProcess: "የእኛ ሂደት",
      processSubtitle: "ቀላል፣ ግልጽ እና ደህንነቱ የተጠበቀ",
      step1Title: "ያስሱ/ያግኙን",
      step1Desc: "ስብስባችንን ያስሱ እና የፈለጉትን ይምረጡ",
      step2Title: "እናማክራለን",
      step2Desc: "በምርጫ እና ዝርዝሮች ላይ የባለሙያ መመሪያ",
      step3Title: "ምርመራ",
      step3Desc: "ፕሮፌሽናል ማረጋገጫ እና የምስክር ወረቀት",
      step4Title: "ማድረስ",
      step4Desc: "በዓለም ዙሪያ ደህንነቱ የተጠበቀ መላኪያ"
    },
    en: {
      // Hero Section
      heroTitle: "Pazion - Shine Like A Gemstone",
      heroSubtitle: "From Mine to International Market",
      heroDescription: "Buying, Selling, Testing & Training - Serving Local & International Markets Since 2009",
      browseGemstones: "Browse Gemstones",
      
      // Services Section
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
      
      // Featured Gemstones
      featuredGemstones: "Featured Gemstones",
      featuredSubtitle: "Handpicked selections from our premium collection",
      blueSapphire: "Blue Sapphire",
      ruby: "Ruby",
      emerald: "Emerald",
      pinkTourmaline: "Pink Tourmaline",
      aquamarine: "Aquamarine",
      amethyst: "Amethyst",
      ceylon: "Ceylon",
      burma: "Burma",
      colombia: "Colombia",
      brazil: "Brazil",
      pakistan: "Pakistan",
      uruguay: "Uruguay",
      newLabel: "New",
      viewDetails: "View Details",
      viewAllGemstones: "View All Gemstones",
      
      // Stats
      gemstonesSold: "Gemstones Sold",
      businessesServed: "Businesses Served",
      countriesReached: "Countries Reached",
      studentsTrained: "Students Trained",
      
      // Testimonials
      testimonialTitle: "What Our Clients Say",
      testimonialSubtitle: "Trusted by thousands worldwide",
      testimonial1Name: "Sarah Johnson",
      testimonial1Location: "New York, USA",
      testimonial1Text: "Outstanding quality and service. I've purchased multiple gemstones for my jewelry business and every stone has been authentic and beautiful.",
      testimonial2Name: "Ahmed Al-Rahman",
      testimonial2Location: "Dubai, UAE",
      testimonial2Text: "Their testing service is impeccable. Fast, accurate, and professional. Highly recommended for wholesale buyers.",
      testimonial3Name: "Maria Santos",
      testimonial3Location: "São Paulo, Brazil",
      testimonial3Text: "The training course was excellent! I learned so much about gemstone identification and grading. Worth every penny.",
      
      // Process
      ourProcess: "Our Process",
      processSubtitle: "Simple, transparent, and secure",
      step1Title: "Browse/Contact",
      step1Desc: "Explore our collection or reach out with your needs",
      step2Title: "Consultation",
      step2Desc: "Expert guidance on selection and specifications",
      step3Title: "Testing",
      step3Desc: "Professional authentication and certification",
      step4Title: "Delivery",
      step4Desc: "Safe and secure shipping worldwide"
    }
  };

  const t = translations[language];

  const heroImages = [
    'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1920&q=80',
    'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1920&q=80',
    'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1920&q=80'
  ];

  const testimonials = [
    {
      name: t.testimonial1Name,
      location: t.testimonial1Location,
      text: t.testimonial1Text,
      rating: 5
    },
    {
      name: t.testimonial2Name,
      location: t.testimonial2Location,
      text: t.testimonial2Text,
      rating: 5
    },
    {
      name: t.testimonial3Name,
      location: t.testimonial3Location,
      text: t.testimonial3Text,
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
    { id: "buying-selling", icon: ShoppingBag, title: t.buyGemstones, desc: t.buyDesc },
    { id: "buying-selling", icon: Award, title: t.sellGemstones, desc: t.sellDesc },
    { id: "gemstone-testing", icon: TestTube, title: t.gemstoneTesting, desc: t.testingDesc },
    { id: "machines", icon: Wrench, title: t.equipmentTools, desc: t.equipmentDesc },
    { id: "courses", icon: GraduationCap, title: t.trainingCourses, desc: t.trainingDesc },
    { id: "buying-selling", icon: MessageCircle, title: t.consultation, desc: t.consultationDesc }
  ];

  const featuredGems = [
    { name: t.blueSapphire, carat: "3.5ct", origin: t.ceylon, price: "$2,500", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80" },
    { name: t.ruby, carat: "2.8ct", origin: t.burma, price: "$3,200", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80" },
    { name: t.emerald, carat: "4.2ct", origin: t.colombia, price: "$2,800", image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&q=80" },
    { name: t.pinkTourmaline, carat: "5.1ct", origin: t.brazil, price: "$1,500", image: "https://images.unsplash.com/photo-1583937443569-f14e8aaaebc3?w=400&q=80" },
    { name: t.aquamarine, carat: "6.3ct", origin: t.pakistan, price: "$1,800", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80" },
    { name: t.amethyst, carat: "8.5ct", origin: t.uruguay, price: "$950", image: "https://images.unsplash.com/photo-1611095564854-f84fe1b949ef?w=400&q=80" }
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
      <section className="relative h-screen overflow-hidden">
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
                {t.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                {t.heroSubtitle}
              </p>
              <p className="text-lg text-gray-300 mb-10">
                {t.heroDescription}
              </p>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.ourServices}</h2>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.featuredGemstones}</h2>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{gem.name}</h3>
                  <div className="flex justify-between text-gray-600 mb-4">
                    <span>{gem.carat}</span>
                    <span>{gem.origin}</span>
                  </div>
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

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.testimonialTitle}</h2>
            <p className="text-xl text-gray-600">{t.testimonialSubtitle}</p>
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
      </section>
    </div>
  );
}