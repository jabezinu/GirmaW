import { Gem, ShoppingCart, GraduationCap, Wrench, Check, Star, Clock, Award, TrendingUp, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Services() {
  const { language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const translations = {
    en: {
      pageTitle: "Our Services",
      pageSubtitle: "Professional gemstone services backed by certified experts and state-of-the-art technology",
      whatWeOffer: "What We Offer",
      ourProcess: "Our Process",
      turnaroundTime: "Turnaround Time",
      globalReach: "Global Reach",
      ourGuarantee: "Our Guarantee",
      additionalBenefits: "Additional Benefits",
      expertInstructors: "Expert Instructors",
      availableCourses: "Available Courses",
      duration: "Duration",
      equipmentCategories: "Equipment Categories",
      trustedBrands: "Trusted Brands We Carry",
      completeSupportPackage: "Complete Support Package",
      clientTestimonials: "Client Testimonials",
      callUsButton: "Call Us or Come to Our Office",
      findLocationButton: "Find Our Location",
      getInTouch: "Get In Touch",
      getInTouchSubtitle: "Ready to get started? Contact us today for all your gemstone needs.",
      callUs: "Call Us",
      speakDirectly: "Speak directly with our experts",
      visitUs: "Visit Us",
      comeToOffice: "Come to our office for in-person service",
      equipmentUsed: "Equipment Used",
      priceLabel: "Price:",
      levelLabel: "Level:",
      services: [
        {
          id: "gemstone-testing",
          title: "Gemstone Testing",
          description: "Professional gemstone identification and quality assessment using state-of-the-art equipment and expert knowledge.",
          price: "Starting from 400ETB",
          priceNote: "Full reports of testing within 24 hours",
          features: [
            "Comprehensive gem species and variety identification",
            "Professional quality grading (color, clarity, cut, carat)",
            "Expert consultation and market valuation included",
            "Treatment and enhancement detection",
            "Origin determination using advanced testing",
            "Weight and measurement verification",
            "Secure handling"
          ],
          process: [
            { title: "Initial Consultation & Visual Inspection:", desc: "We examine the gemstone visually and discuss your requirements" },
            { title: "Basic Gemological Testing:", desc: "Standard tests including specific gravity, hardness, and refractive index measurements" },
            { title: "Advanced Equipment Analysis:", desc: "In-depth analysis using spectrometers, refractometers, microscopes, and other specialized tools" },
            { title: "Expert Report Compilation:", desc: "Our certified gemologists compile a comprehensive report with findings and recommendations" }
          ],
          processNote: "Note: We do not perform testing using photography; all assessments require the gemstone to be brought to our office.",
          turnaround: "All testing completed within 24 hours",
          equipment: "Spectrometer • Refractometer • Gemological Microscope • UV Light • Dichroscope • Polariscope"
        },
        {
          id: "buying-selling",
          title: "Buying & Selling Services",
          description: "We buy and sell any kind of gemstone you have. Whether you're looking to purchase or sell gemstones of any type, call us or come to our office for immediate assistance. We cater to both local and international purchasers with secure transactions, professional valuation, worldwide shipping, and complete transparency.",
          price: "Commission-based",
          priceNote: "Sellers: 2% commission on successful sales",
          features: [
            "Professional market analysis and price guidance",
            "Verified buyer and seller matching worldwide",
            "Secure services for transaction safety",
            "Complete authentication and quality verification",
            "International shipping coordination and tracking",
            "Comprehensive insurance assistance and coverage",
            "Real-time market trend analysis and reports",
            "Expert negotiation support and advisory"
          ],
          process: [
            { title: "Initial Consultation & Valuation:", desc: "We assess your gemstones in person and provide professional market valuation. We have every kind of gemstone available for purchase." },
            { title: "Purchase Processing:", desc: "We buy gemstones directly from sellers, including those from rural areas, ensuring fair pricing and immediate payment" },
            { title: "Inventory & Preparation:", desc: "Professional grading, photography, and preparation for international market sales" },
            { title: "Direct Sales & Delivery:", desc: "We sell gemstones directly to international markets with secure transactions and worldwide shipping" }
          ],
          // markets: "We connect clients across North America, Europe, Asia, and the Middle East, giving you access to the world's most active gem markets.",
          guarantee: "30-day satisfaction guarantee • Authenticity verification • Insured shipping • Secure payment processing"
        },
        {
          id: "courses",
          title: "Training Courses",
          description: "Comprehensive courses for gemstone enthusiasts and professionals, from beginner to advanced levels. Learn from industry experts with decades of experience. Our curriculum combines theoretical knowledge with hands-on training using real gemstones and professional equipment.",
          features: [
            "Structured curriculum from beginner to expert levels",
            "Flexible online and in-person class options",
            "Industry-recognized certificate upon completion",
            "Extensive hands-on training with real specimens",
            "Access to professional gemological equipment",
            "Lifetime access to course materials (online courses)",
            "One-on-one mentorship and career guidance",
            "Job placement assistance and industry connections"
          ],
          courses: [
            { name: "Gemology Fundamentals", duration: "4 weeks", price: "$299", level: "Beginner", desc: "Introduction to gem identification, basic properties, and industry terminology" },
            { name: "Advanced Gem Identification", duration: "8 weeks", price: "$699", level: "Intermediate", desc: "Master advanced testing techniques and equipment operation" },
            { name: "Professional Gemologist Certification", duration: "16 weeks", price: "$1,299", level: "Advanced", desc: "Comprehensive professional training with industry certification" },
            { name: "Gem Business & Marketing", duration: "6 weeks", price: "$499", level: "All Levels", desc: "Learn to start and grow your gemstone business" }
          ],
          benefits: "Small class sizes • Professional equipment access • Career networking events"
        },
        {
          id: "machines",
          title: "Equipment Sales",
          description: "High-quality tools and machinery for gemstone testing, cutting, and processing. We supply professional-grade equipment for gemologists, jewelers, lapidaries, and educational institutions. From precision loupes to advanced cutting machines, we stock everything you need with expert guidance and full support.",
          price: "Varies",
          features: [
            "Professional-grade precision loupes and microscopes",
            "Advanced testing and analysis equipment",
            "Complete cutting and faceting tool systems",
            "Industrial processing machinery and supplies",
            "New and certified refurbished equipment options",
            "Comprehensive warranty and technical support",
            "Free equipment training and setup assistance",
            "Trade-in programs and financing plans"
          ],
          categories: [
            { name: "Testing & Analysis Equipment", items: "Refractometers • Spectrometers • UV Lamps • Dichroscopes • Polariscopes • Thermal Conductivity Meters" },
            { name: "Magnification & Observation", items: "10x Triplet Loupes • Binocular Microscopes • LED Illuminators • Darkfield Systems" },
            { name: "Cutting & Faceting Tools", items: "Faceting Machines • Cabbing Equipment • Polishing Wheels • Diamond Discs • Lap Systems" },
            { name: "Processing Machinery", items: "Rock Tumblers • Ultrasonic Cleaners • Vacuum Chambers • Trim Saws • Grinding Equipment" }
          ],
          brands: "We carry top brands including Zeiss • Presidium • GemOro • Ultra Tec • Grobet • Kassoy • Foredom • Crystalite",
          support: "Free installation assistance • Equipment training included • Technical support hotline • Maintenance services • Replacement parts inventory"
        }
      ]
    },
    am: {
      pageTitle: "የምንሰጣቸው አገልግሎቶች",
      pageSubtitle: "በተረጋገጡ ባለሙያዎች እና በዘመናዊ ቴክኖሎጂ የተደገፉ ሙያዊ አገልግሎቶች",
      whatWeOffer: "የምናቀርበው",
      ourProcess: "የምናከናውናቸው ሂደት",
      turnaroundTime: "የማጠናቀቂያ ጊዜ",
      globalReach: "ዓለም አቀፍ ተደራሽነት",
      ourGuarantee: "የእኛ ዋስትና",
      additionalBenefits: "ተጨማሪ ጥቅሞች",
      expertInstructors: "ባለሙያ አስተማሪዎች",
      availableCourses: "ያሉ ኮርሶች",
      duration: "ቆይታ",
      equipmentCategories: "የመሳሪያ ምድቦች",
      trustedBrands: "የምንሸጣቸው የታመኑ ብራንዶች",
      completeSupportPackage: "ሙሉ የድጋፍ ፓኬጅ",
      clientTestimonials: "የደንበኛ ምስክርነቶች",
      callUsButton: "ይደውሉልን ወይም ወደ ቢሮችን ይምጡ",
      findLocationButton: "አድራሻችንን ይፈልጉ",
      services: [
        {
          id: "gemstone-testing",
          title: "የመአድን ምርመራ",
          description: "በዘመናዊ መሳሪያዎች እና በባለሙያ እውቀት የሚደረግ ሙያዊ የመአድን መለያ እና የጥራት ግምገማ።",
          price: "ከ400 ብር ጀምሮ",
          priceNote: "በ24 ሰዓት ውስጥ ሙሉ የምርመራ ሪፖርት",
          features: [
            "አጠቃላይ የመአድን ዝርያ እና መለያ",
            "ሙያዊ የጥራት ደረጃ መስጠት (መቁረጥ፣ ክብደት)",
            "መአድናትን ማከምና እና ማሻሻል",
            "በላቀ ምርመራ የተገኘበትን ቦታ መለየት",
            "ክብደት እና ጥራት ማረጋገጥ",
            "በሙሉ ሽፋን ደህንነቱ የተጠበቀ አያያዝ"
          ],
          process: [
            { title: "የመጀመሪያ ምክክር እና እይታ ምርመራ:", desc: "መዐድኑን በዓይን ምርመራ እናደርጋለን" },
            { title: "መሰረታዊ የመአድን ምርመራ:", desc: "መረጃ ጠቋሚ መለኪያዎችን በመጠቀም መደበኛ ምርመራዎች" },
            { title: "የላቀ የመሳሪያ ትንተና:", desc: "በስፔክትሮሜትሮች፣ ማለፊያ መለኪያዎች፣ ማይክሮስኮፖች እና ሌሎች ልዩ መሳሪያዎች በመጠቀም ጥልቅ ትንተና" },
            { title: "የባለሙያ ሪፖርት ማዘጋጀት:", desc: "ስለ መአድኑ ግኝቶችን እና ምክሮችን የያዘ አጠቃላይ ሪፖርት እናዘጋጃለን" }
          ],
          processNote: "ማስታወሻ፡ በፎቶግራፍ በመጠቀም ምርመራ አናካሂድም። ሁሉም ግምገማዎች መአድኑን ወደ ቢሮአችን መምጣት ያስፈልጋል።",
          turnaround: "ሁሉም ምርመራዎች በ24 ሰዓት ውስጥ ይጠናቀቃሉ",
          // equipment: "ስፔክትሮሜትር • ማለፊያ መለኪያ • የጌሞሎጂ ማይክሮስኮፕ • የአልትራቫዮሌት ብርሃን • ዲክሮስኮፕ • ፖላሪስኮፕ"
        },
        {
          id: "buying-selling",
          title: "የመግዛት እና የመሸጥ አገልግሎቶች",
          description: "የሚኖርዎትን ማንኛውንም ዓይነት ከበረ ዕንቁ እንገዛለን እና እንሸጣለን። ማንኛውንም ዓይነት መአድን ለመግዛት ወይም ለመሸጥ ከፈለጉ ይደውሉልን ወይም ለፈጣን እርዳታ ወደ ቢሮችን ይምጡ። ደህንነቱ የተጠበቀ ግብይት፣ ሙያዊ ግምገማ፣ ዓለም አቀፍ መላኪያ እና ሙሉ ግልጽነት ያለው አገልግሎት እንሰጣለን።",
          price: "በኮሚሽን ላይ የተመሰረተ",
          priceNote: "ሻጮች፡ በተሳካ ሽያጭ ላይ 2% ኮሚሽን",
          features: [
            "ሙያዊ የገበያ ትንተና እና የዋጋ መመሪያ",
            "በዓለም ዙሪያ የተረጋገጡ ገዥዎች እና ሻጮች ማገናኘት",
            "ለግብይት ደህንነቱ የተጠበቀ አገልግሎቱቶች",
            "አጠቃላይ የኢንሹራንስ እርዳታ እና ሽፋን",
            "የገበያ አዝማሚያ ትንተና እና ሪፖርቶች",
          ],
          process: [
            { title: "የመጀመሪያ ምክክር እና ግምገማ:", desc: "መአድኑን በአካል እንገመግማለን እና ሙያዊ የገበያ ግምገማ እንሰጣለን" },
            // { title: "ዝርዝር እና ግብይት:", desc: "ለገዥ አቀራረብ ሙያዊ ፎቶግራፍ እና ዝርዝር መግለጫዎች" },
            { title: "ድርድር:", desc: "ተገናኝተው ደህንነቱ የተጠበቀ ግብይት ያመቻቹ" },
            // { title: "ኤስክሮው እና አቅርቦት:", desc: "ደህንነቱ የተጠበቀ የክፍያ ሂደት እና የተረጋገጠ የመላኪያ ቅንጅት" }
          ],
          markets: "በሰሜን አሜሪካ፣ አውሮፓ፣ እስያ እና መካከለኛው ምስራቅ ደንበኞችን እናገናኛለን፣ ይህም ወደ የዓለማችን በጣም ንቁ የዕንቁ ገበያዎች ተደራሽነት ይሰጥዎታል።",
          guarantee: "የ30 ቀን እርካታ ዋስትና • የማረጋገጫ ማረጋገጥ • ኢንሹራንስ • ደህንነቱ የተጠበቀ የክፍያ ሂደት"
        },
        {
          id: "courses",
          title: "የስልጠና ኮርሶች",
          description: "ከጀማሪ እስከ አድቫንስድ የሚሆኑ አጠቃላይ ኮርሶች። በዘርፉ ልምድ ካላቸው የኢንዱስትሪ ባለሙያዎች ይማሩ።",
          features: [
            "ከጀማሪ እስከ አድቫንስድ ደረጃዎች የሚሆኑ መዋቅራዊ ስርዓተ ትምህርት",
            "በኦንላይን ላይ እና በአካል የክፍል አማራጮች",
            "በኢንዱስትሪው የተረጋገጠ የምስክር ወረቀት በማጠናቀቅ ጊዜ",
            "በእውነተኛ ናሙናዎች ሰፊ ተግባራዊ ስልጠና",
            "የአንድ-ለ-አንድ አማካሪነት እና የሙያ ድጋፍ",
            "የስራ ምደባ እርዳታ እና የኢንዱስትሪ ግንኙነቶች"
          ],
          courses: [
            { name: "የጌሞሎጂ መሰረታዊ ነገሮች", duration: "4 ሳምንታት", price: "$299", level: "ጀማሪ", desc: "የዕንቁ መለያ፣ መሰረታዊ ባህሪያት እና የኢንዱስትሪ ቃላት ማስተዋወቂያ" },
            { name: "የላቀ የዕንቁ መለያ", duration: "8 ሳምንታት", price: "$699", level: "መካከለኛ", desc: "የላቁ የምርመራ ቴክኒኮችን እና የመሳሪያ አሠራርን ይማሩ" },
            { name: "ሙያዊ የጌሞሎጂስት ምስክር ወረቀት", duration: "16 ሳምንታት", price: "$1,299", level: "ላቀ", desc: "በኢንዱስትሪ ምስክር ወረቀት አጠቃላይ ሙያዊ ስልጠና" },
            { name: "የዕንቁ ንግድ እና ግብይት", duration: "6 ሳምንታት", price: "$499", level: "ሁሉም ደረጃዎች", desc: "የዕንቁ ንግድዎን እንዴት እንደሚጀምሩ እና እንደሚያሳድጉ ይማሩ" }
          ],
          benefits: "ትናንሽ የክፍል መጠኖች • የሙያ መሳሪያ መዳረሻ • የሙያ የኔትወርክ ክስተቶች"
        },
        {
          id: "machines",
          title: "የመሳሪያ ሽያጭ",
          description: "ጥራት ያላቸው መሳሪያዎች እና ማሽኖች። ለመአድን አውጪዎች እና ለጌጣጌጥ ሠሪዎች መሳሪያዎችን እናቀርባለን። ከባለሙያ መመሪያ እና ሙሉ ድጋፍ ጋር የሚፈልጉትን ሁሉ እናቀርባለን።",
          price: "ይለያያል",
          features: [
            "የላቁ የምርመራ እና የትንተና መሳሪያዎች",
            "ሙሉ የመቁረጫ እና የፊሴቲንግ መሳሪያ ስርዓቶች",
            "የኢንዱስትሪ ማቀናበሪያ ማሽኖች እና አቅርቦቶች",
            "አዲስ እና የተረጋገጠ የተስተካከለ የመሳሪያ አማራጮች",
            "አጠቃላይ ዋስትና እና ቴክኒካል ድጋፍ",
            "ነጻ የመሳሪያ ስልጠና እና የማዋቀሪያ እርዳታ",
            "የንግድ-ግብይት ፕሮግራሞች እና የፋይናንስ እቅዶች"
          ],
          categories: [
            { name: "የምርመራ እና የትንተና መሳሪያዎች", items: "ማለፊያ መለኪያዎች • ስፔክትሮሜትሮች • የአልትራቫዮሌት መብራቶች • ዲክሮስኮፖች • ፖላሪስኮፖች • የሙቀት ማስተላለፊያ መለኪያዎች" },
            { name: "ማጉላት እና ምልከታ", items: "10x ትሪፕሌት ሉፕስ • ባይኖኩላር ማይክሮስኮፖች • LED ማብራቶች • ዳርክፊልድ ስርዓቶች" },
            { name: "የመቁረጫ እና ፊሴቲንግ መሳሪያዎች", items: "ፊሴቲንግ ማሽኖች • ካቢንግ መሳሪያዎች • የማሸት ጎማዎች • የአልማዝ ዲስኮች • የኮድ ስርዓቶች" },
            { name: "የማቀናበሪያ ማሽኖች", items: "የድንጋይ ማሽከርከር ማሽኖች • አልትራሳውንድ ማጽጃዎች • ክፍት ክፍሎች • የመቁረጫ መናጭቶች • የመፍጫ መሳሪያዎች" }
          ],
          brands: "የሚከተሉትን ከፍተኛ ብራንዶች እንሸጣለን፡ Zeiss • Presidium • GemOro • Ultra Tec • Grobet • Kassoy • Foredom • Crystalite",
          support: "ነጻ የመጫኛ እርዳታ • የመሳሪያ ስልጠና የተካተተ • የቴክኒካል ድጋፍ የስልክ መስመር • የጥገና አገልግሎቶች • የመለዋወጫ ክፍሎች ክምችት"
        }
      ]
    }
  };

  const t = translations[language];
  const icons = [Gem, ShoppingCart, GraduationCap, Wrench];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">

      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t.pageTitle}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t.pageSubtitle}
        </p>
      </div>

      {t.services.map((service, index) => {
        const Icon = icons[index];
        return (
          <section key={index} id={service.id} className="mb-20 scroll-mt-20">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-shadow duration-500">
              {/* Service Header */}
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 p-8 md:p-12 text-white">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                    <Icon className="w-12 h-12 md:w-16 md:h-16" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">{service.title}</h2>
                    <p className="text-lg md:text-xl text-blue-100 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>

              {/* Pricing Banner */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 md:px-12 py-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="text-sm text-gray-600 max-w-2xl">
                    {service.priceNote}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-8 md:p-12">
                {/* Features Grid */}
                <div className="mb-12">
                  <div className="flex items-center mb-6">
                    <Check className="w-6 h-6 text-green-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">{t.whatWeOffer}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process Section */}
                {service.process && (
                  <div className="mb-12">
                    <div className="flex items-center">
                      <Clock className="w-6 h-6 text-blue-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">{t.ourProcess}</h3>
                    </div>
                    <div className="space-y-4">
                      {service.process.map((step, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-0">
                          <h4 className="font-semibold text-gray-900 md:col-span-1">{step.title}</h4>
                          <p className="text-gray-700 md:col-span-2">{step.desc}</p>
                        </div>
                      ))}
                      {service.processNote && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                          <p className="text-yellow-800">{service.processNote}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Turnaround Time */}
                {service.turnaround && (
                  <div className="mb-12">
                    <div className="flex items-center mb-6">
                      <Clock className="w-6 h-6 text-purple-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">{t.turnaroundTime}</h3>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-6">
                      <p className="text-purple-800 font-medium">{service.turnaround}</p>
                    </div>
                  </div>
                )}

                {/* Equipment Used */}
                {service.equipment && (
                  <div className="mb-12">
                    <div className="flex items-center mb-6">
                      <Wrench className="w-6 h-6 text-orange-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">{t.equipmentUsed}</h3>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-6">
                      <p className="text-orange-800">{service.equipment}</p>
                    </div>
                  </div>
                )}

                {/* Service-specific sections */}
                {service.id === 'buying-selling' && (
                  <>
                    {/* Global Reach */}
                    <div className="mb-12">
                      <div className="flex items-center mb-6">
                        <TrendingUp className="w-6 h-6 text-indigo-600 mr-3" />
                        <h3 className="text-2xl font-bold text-gray-900">{t.globalReach}</h3>
                      </div>
                    </div>

                    {/* Guarantee */}
                    <div className="mb-12">
                      <div className="flex items-center mb-6">
                        <Award className="w-6 h-6 text-green-600 mr-3" />
                        <h3 className="text-2xl font-bold text-gray-900">{t.ourGuarantee}</h3>
                      </div>
                      <div className="bg-green-50 rounded-lg p-6">
                        <p className="text-green-800">{service.guarantee}</p>
                      </div>
                    </div>
                  </>
                )}

                {service.id === 'courses' && (
                  <>
                    {/* Available Courses */}
                    <div className="mb-12">
                      <div className="flex items-center mb-6">
                        <GraduationCap className="w-6 h-6 text-teal-600 mr-3" />
                        <h3 className="text-2xl font-bold text-gray-900">{t.availableCourses}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {service.courses.map((course, idx) => (
                          <div key={idx} className="bg-teal-50 rounded-lg p-6">
                            <h4 className="font-bold text-teal-900 mb-2">{course.name}</h4>
                            <div className="space-y-1 text-sm text-teal-800">
                              <p><strong>{t.duration}:</strong> {course.duration}</p>
                              <p><strong>{t.priceLabel}</strong> {course.price}</p>
                              <p><strong>{t.levelLabel}</strong> {course.level}</p>
                            </div>
                            <p className="text-teal-700 mt-3">{course.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Benefits */}
                    <div className="mb-12">
                      <div className="flex items-center mb-6">
                        <Star className="w-6 h-6 text-yellow-600 mr-3" />
                        <h3 className="text-2xl font-bold text-gray-900">{t.additionalBenefits}</h3>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-6">
                        <p className="text-yellow-800">{service.benefits}</p>
                      </div>
                    </div>
                  </>
                )}

                {service.id === 'machines' && (
                  <>
                    {/* Equipment Categories */}
                    <div className="mb-12">
                      <div className="flex items-center mb-6">
                        <Wrench className="w-6 h-6 text-red-600 mr-3" />
                        <h3 className="text-2xl font-bold text-gray-900">{t.equipmentCategories}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {service.categories.map((category, idx) => (
                          <div key={idx} className="bg-red-50 rounded-lg p-6">
                            <h4 className="font-bold text-red-900 mb-3">{category.name}</h4>
                            <p className="text-red-800 text-sm">{category.items}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Trusted Brands */}
                    <div className="mb-12">
                      <div className="flex items-center mb-6">
                        <Award className="w-6 h-6 text-blue-600 mr-3" />
                        <h3 className="text-2xl font-bold text-gray-900">{t.trustedBrands}</h3>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-6">
                        <p className="text-blue-800">{service.brands}</p>
                      </div>
                    </div>

                    {/* Complete Support Package */}
                    <div className="mb-12">
                      <div className="flex items-center mb-6">
                        <Check className="w-6 h-6 text-green-600 mr-3" />
                        <h3 className="text-2xl font-bold text-gray-900">{t.completeSupportPackage}</h3>
                      </div>
                      <div className="bg-green-50 rounded-lg p-6">
                        <p className="text-green-800">{service.support}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        );
      })}


      {/* Contact Section */}
      <section className="bg-gray-50 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.getInTouch}</h2>
          <p className="text-xl text-gray-600">{t.getInTouchSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center text-center">
            <Phone className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.callUs}</h3>
            <p className="text-gray-600 mb-4">{t.speakDirectly}</p>
            <Link to="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold inline-block">
              {t.callUsButton}
            </Link>
          </div>
          <div className="flex flex-col items-center text-center">
            <MapPin className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.visitUs}</h3>
            <p className="text-gray-600 mb-4">{t.comeToOffice}</p>
            <Link to="/contact" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 font-semibold inline-block">
              {t.findLocationButton}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}