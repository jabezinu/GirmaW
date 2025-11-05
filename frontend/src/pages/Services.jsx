import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Gem, ShoppingCart, GraduationCap, Wrench, Check, Star, Clock, Award, TrendingUp, Mail, Phone, MapPin } from 'lucide-react';

export default function Services() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const services = [
    {
      id: "gemstone-testing",
      icon: Gem,
      title: "Gemstone Testing",
      description: "Professional gemstone identification and quality assessment using state-of-the-art equipment and expert knowledge. ",
      price: "Starting from 400ETB",
      priceNote: "Full reports of testing within 24 hours",
      features: [
        "Comprehensive gem species and variety identification", 
        "Professional quality grading (color, clarity, cut, carat)",
        "Expert consultation and market valuation included",
        "Treatment and enhancement detection",
        "Origin determination using advanced testing",
        "Weight and measurement verification",
        "Secure handling with full insurance coverage"
      ],
      detailedInfo: {
        process: (
          <div>
            {/* <p className="mb-4">Our testing process involves multiple stages of analysis conducted in person at our office:</p> */}
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li><strong>Initial Consultation & Visual Inspection:</strong> We examine the gemstone visually and discuss your requirements</li>
              <li><strong>Basic Gemological Testing:</strong> Standard tests including specific gravity, hardness, and refractive index measurements</li>
              <li><strong>Advanced Equipment Analysis:</strong> In-depth analysis using spectrometers, refractometers, microscopes, and other specialized tools</li>
              <li><strong>Expert Report Compilation:</strong> Our certified gemologists compile a comprehensive report with findings and recommendations</li>
            </ol>
            <p className="mt-4 text-sm text-gray-600 italic">Note: We do not perform testing using photography; all assessments require the gemstone to be brought to our office.</p>
          </div>
        ),
        turnaround: "All testing completed within 24 hours",
        equipment: "Spectrometer • Refractometer • Gemological Microscope • UV Light • Dichroscope • Polariscope"
      },
      testimonials: [
        { name: "Sarah Mitchell", role: "Jewelry Collector", text: "The detailed analysis helped me authenticate a family heirloom. Professional service and thorough documentation.", rating: 5 },
        { name: "James Chen", role: "Gem Dealer", text: "Fast, accurate, and reliable. I trust their expertise for all my high-value stones.", rating: 5 }
      ]
    },
    {
      id: "buying-selling",
      icon: ShoppingCart,
      title: "Buying & Selling Services",
      description: "We buy and sell any kind of gemstone you have. Whether you're looking to purchase or sell gemstones of any type, call us or come to our office for immediate assistance. We cater to both local and international purchasers with secure transactions, professional valuation, worldwide shipping, and complete transparency.",
      price: "Commission-based",
      priceNote: "Sellers: 10% commission on successful sales",
      features: [
        "Professional market analysis and price guidance", 
        "Verified buyer and seller matching worldwide",
        "Secure escrow services for transaction safety",
        "Complete authentication and quality verification",
        "International shipping coordination and tracking",
        "Comprehensive insurance assistance and coverage",
        "Real-time market trend analysis and reports",
        "Expert negotiation support and advisory"
      ],
      detailedInfo: {
        process: (
          <div>
            {/* <p className="mb-4">Our buying and selling process ensures secure, transparent transactions:</p> */}
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li><strong>Initial Consultation & Valuation:</strong> We assess your gemstones in person and provide professional market valuation</li>
              {/* <li><strong>Authentication & Documentation:</strong> Complete quality verification and certification (in-person testing only)</li> */}
              <li><strong>Listing & Marketing:</strong> Professional photography and detailed descriptions for buyer presentation</li>
              <li><strong>Buyer Matching & Negotiation:</strong> Connect with verified buyers and facilitate secure transactions</li>
              <li><strong>Escrow & Delivery:</strong> Secure payment processing and insured shipping coordination</li>
            </ol>
            {/* <p className="mt-4 text-sm text-gray-600 italic">Note: All authentication and testing requires in-person assessment at our office; we do not perform testing using photography.</p> */}
          </div>
        ),
        markets: "We connect clients across North America, Europe, Asia, and the Middle East, giving you access to the world's most active gem markets.",
        guarantee: "30-day satisfaction guarantee • Authenticity verification • Insured shipping • Secure payment processing"
      },
      testimonials: [
        { name: "Michael Rodriguez", role: "Estate Seller", text: "Sold my inherited sapphire collection at fair market value. The process was transparent and professional throughout.", rating: 5 },
        { name: "Lisa Thompson", role: "Private Collector", text: "Found rare emeralds for my collection. The authentication service gave me complete confidence.", rating: 5 }
      ]
    },
    {
      id: "courses",
      icon: GraduationCap,
      title: "Training Courses",
      description: "Comprehensive courses for gemstone enthusiasts and professionals, from beginner to advanced levels. Learn from industry experts with decades of experience. Our curriculum combines theoretical knowledge with hands-on training using real gemstones and professional equipment.",
      // price: "$299 - $1,299",
      // priceNote: "Beginner courses from $299 | Advanced certification from $1,299 | Payment plans available",
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
      detailedInfo: {
        courses: [
          { name: "Gemology Fundamentals", duration: "4 weeks", price: "$299", level: "Beginner", desc: "Introduction to gem identification, basic properties, and industry terminology" },
          { name: "Advanced Gem Identification", duration: "8 weeks", price: "$699", level: "Intermediate", desc: "Master advanced testing techniques and equipment operation" },
          { name: "Professional Gemologist Certification", duration: "16 weeks", price: "$1,299", level: "Advanced", desc: "Comprehensive professional training with industry certification" },
          { name: "Gem Business & Marketing", duration: "6 weeks", price: "$499", level: "All Levels", desc: "Learn to start and grow your gemstone business" }
        ],
        benefits: "Small class sizes • Professional equipment access • Career networking events",
        instructors: "All courses taught by GIA or FGA certified gemologists with 15+ years of industry experience"
      },
      testimonials: [
        { name: "Amanda Torres", role: "Course Graduate", text: "The certification program transformed my career. Now I'm running my own successful gem consulting business!", rating: 5 },
        { name: "David Park", role: "Jewelry Designer", text: "Excellent hands-on training. The knowledge I gained helps me select better stones for my designs.", rating: 5 }
      ]
    },
    {
      id: "machines",
      icon: Wrench,
      title: "Equipment Sales",
      description: "High-quality tools and machinery for gemstone testing, cutting, and processing. We supply professional-grade equipment for gemologists, jewelers, lapidaries, and educational institutions. From precision loupes to advanced cutting machines, we stock everything you need with expert guidance and full support.",
      price: "Varies",
      // priceNote: "Loupes from $45 | Professional microscopes from $2,500 | Cutting machines from $5,000 | Financing available",
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
      detailedInfo: {
        categories: [
          { 
            name: "Testing & Analysis Equipment", 
            items: "Refractometers • Spectrometers • UV Lamps • Dichroscopes • Polariscopes • Thermal Conductivity Meters",
            // priceRange: "From $350"
          },
          { 
            name: "Magnification & Observation", 
            items: "10x Triplet Loupes • Binocular Microscopes • LED Illuminators • Darkfield Systems",
            // priceRange: "From $45"
          },
          { 
            name: "Cutting & Faceting Tools", 
            items: "Faceting Machines • Cabbing Equipment • Polishing Wheels • Diamond Discs • Lap Systems",
            // priceRange: "From $1,200"
          },
          { 
            name: "Processing Machinery", 
            items: "Rock Tumblers • Ultrasonic Cleaners • Vacuum Chambers • Trim Saws • Grinding Equipment",
            // priceRange: "From $450"
          }
        ],
        brands: "We carry top brands including Zeiss • Presidium • GemOro • Ultra Tec • Grobet • Kassoy • Foredom • Crystalite",
        support: "Free installation assistance • Equipment training included • Technical support hotline • Maintenance services • Replacement parts inventory"
      },
      testimonials: [
        { name: "Robert Singh", role: "Independent Gemologist", text: "Purchased a complete testing setup. Great pricing and the training session was invaluable for getting started.", rating: 5 },
        { name: "Emma White", role: "Lapidary Artist", text: "The faceting machine exceeded my expectations. Customer support walked me through every step of setup.", rating: 5 }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Our Services
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Professional gemstone services backed by certified experts and state-of-the-art technology
        </p>
      </div>

      {services.map((service, index) => {
        const Icon = service.icon;
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
                  {/* <div> */}
                    {/* <p className="text-sm text-gray-600 mb-1 font-medium uppercase tracking-wide">Pricing</p> */}
                    {/* <p className="text-3xl md:text-4xl font-bold text-blue-600">{service.price}</p> */}
                  {/* </div> */}
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
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">What We Offer</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((feature, i) => (
                      <div key={i} className="group flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 hover:shadow-md transition-all duration-300">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-gray-700 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Information Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                  {/* Process/Markets Info */}
                  {service.detailedInfo.process && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                      <div className="flex items-center mb-4">
                        <Clock className="w-6 h-6 text-blue-600 mr-3" />
                        <h4 className="text-xl font-bold text-gray-900">Our Process</h4>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{service.detailedInfo.process}</p>
                    </div>
                  )}

                  {/* Turnaround/Markets */}
                  {service.detailedInfo.turnaround && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                      <div className="flex items-center mb-4">
                        <TrendingUp className="w-6 h-6 text-purple-600 mr-3" />
                        <h4 className="text-xl font-bold text-gray-900">Turnaround Time</h4>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{service.detailedInfo.turnaround}</p>
                    </div>
                  )}

                  {service.detailedInfo.markets && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                      <div className="flex items-center mb-4">
                        <TrendingUp className="w-6 h-6 text-purple-600 mr-3" />
                        <h4 className="text-xl font-bold text-gray-900">Global Reach</h4>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{service.detailedInfo.markets}</p>
                    </div>
                  )}
                </div>

                {/* Equipment/Guarantee/Benefits */}

                {service.detailedInfo.guarantee && (
                  <div className="bg-green-50 p-6 rounded-2xl mb-8 border border-green-200">
                    <div className="flex items-center mb-4">
                      <Award className="w-6 h-6 text-green-600 mr-3" />
                      <h4 className="text-xl font-bold text-gray-900">Our Guarantee</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{service.detailedInfo.guarantee}</p>
                  </div>
                )}

                {service.detailedInfo.benefits && (
                  <div className="bg-blue-50 p-6 rounded-2xl mb-8 border border-blue-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Additional Benefits</h4>
                    <p className="text-gray-700 leading-relaxed">{service.detailedInfo.benefits}</p>
                  </div>
                )}

                {/* {service.detailedInfo.instructors && (
                  <div className="bg-amber-50 p-6 rounded-2xl mb-8 border border-amber-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Expert Instructors</h4>
                    <p className="text-gray-700 leading-relaxed">{service.detailedInfo.instructors}</p>
                  </div>
                )} */}

                {/* Courses List */}
                {service.detailedInfo.courses && (
                  <div className="mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Available Courses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {service.detailedInfo.courses.map((course, i) => (
                        <div key={i} className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-xl font-bold text-gray-900 flex-1">{course.name}</h4>
                            <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold ml-2">
                              {course.level}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4 leading-relaxed">{course.desc}</p>
                          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                            <span className="text-sm text-gray-600 font-medium">Duration: {course.duration}</span>
                            <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Equipment Categories */}
                {service.detailedInfo.categories && (
                  <div className="mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Equipment Categories</h3>
                    <div className="space-y-4">
                      {service.detailedInfo.categories.map((cat, i) => (
                        <div key={i} className="bg-gradient-to-r from-white to-blue-50 border-l-4 border-blue-600 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                            <h4 className="text-xl font-bold text-gray-900 mb-2 md:mb-0">{cat.name}</h4>
                            <span className="text-blue-600 font-bold text-lg">{cat.priceRange}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{cat.items}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Brands */}
                {service.detailedInfo.brands && (
                  <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Trusted Brands We Carry</h4>
                    <p className="text-gray-700 leading-relaxed">{service.detailedInfo.brands}</p>
                  </div>
                )}

                {/* Support */}
                {service.detailedInfo.support && (
                  <div className="bg-green-50 p-6 rounded-2xl mb-8 border border-green-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Complete Support Package</h4>
                    <p className="text-gray-700 leading-relaxed">{service.detailedInfo.support}</p>
                  </div>
                )}

                {/* Testimonials */}
                {/* <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Client Testimonials</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.testimonials.map((testimonial, i) => (
                      <div key={i} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border-l-4 border-yellow-400 shadow-md hover:shadow-xl transition-all duration-300">
                        <div className="flex mb-3">
                          {[...Array(testimonial.rating)].map((_, j) => (
                            <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-700 mb-4 leading-relaxed italic">"{testimonial.text}"</p>
                        <div>
                          <p className="font-bold text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}

                {/* CTA Button */}
                {service.id === "buying-selling" && (
                  <div className="text-center pt-8 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        to="/contact"
                        className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl text-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center"
                      >
                        <Phone className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                        Call Us or Come to Our Office
                      </Link>
                      {/* <Link
                        to="/contact"
                        className="group bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 px-8 rounded-xl text-lg font-bold hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center"
                      >
                        <MapPin className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                        Find Our Location
                      </Link> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}