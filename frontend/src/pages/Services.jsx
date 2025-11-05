import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
      title: "Gemstone Testing & Authentication",
      description: "Professional gemstone identification and quality assessment using state-of-the-art equipment and expert knowledge.",
      price: "Starting from $50",
      features: ["Gem identification", "Quality grading", "Certificate issuance", "Expert consultation"]
    },
    {
      id: "buying-selling",
      title: "Buying & Selling Services",
      description: "Connect with verified buyers and sellers worldwide. We facilitate secure transactions and provide market insights.",
      price: "Commission-based",
      features: ["Market analysis", "Buyer/seller matching", "Secure transactions", "International shipping"]
    },
    {
      id: "courses",
      title: "Training Courses",
      description: "Comprehensive courses for gemstone enthusiasts and professionals, from beginner to advanced levels.",
      price: "$299 - $1,299",
      features: ["Online & in-person", "Certificate upon completion", "Hands-on training", "Lifetime support"]
    },
    {
      id: "machines",
      title: "Equipment Sales",
      description: "High-quality tools and machinery for gemstone testing, cutting, and processing.",
      price: "Varies",
      features: ["Loupes & microscopes", "Testing equipment", "Cutting tools", "Processing machinery"]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Services</h1>
      {services.map((service, index) => (
        <section key={index} id={service.id} className="mb-16 bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">{service.title}</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">{service.description}</p>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Pricing</h3>
              <p className="text-2xl font-bold text-blue-600">{service.price}</p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">What We Offer</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 text-lg font-semibold">
              Learn More
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}