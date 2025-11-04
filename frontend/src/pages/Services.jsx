export default function Services() {
  const services = [
    {
      title: "Gemstone Testing & Authentication",
      description: "Professional gemstone identification and quality assessment using state-of-the-art equipment and expert knowledge.",
      price: "Starting from $50",
      features: ["Gem identification", "Quality grading", "Certificate issuance", "Expert consultation"]
    },
    {
      title: "Buying & Selling Services",
      description: "Connect with verified buyers and sellers worldwide. We facilitate secure transactions and provide market insights.",
      price: "Commission-based",
      features: ["Market analysis", "Buyer/seller matching", "Secure transactions", "International shipping"]
    },
    {
      title: "Training Courses",
      description: "Comprehensive courses for gemstone enthusiasts and professionals, from beginner to advanced levels.",
      price: "$299 - $1,299",
      features: ["Online & in-person", "Certificate upon completion", "Hands-on training", "Lifetime support"]
    },
    {
      title: "Equipment Sales",
      description: "High-quality tools and machinery for gemstone testing, cutting, and processing.",
      price: "Varies",
      features: ["Loupes & microscopes", "Testing equipment", "Cutting tools", "Processing machinery"]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <p className="text-xl font-bold text-blue-600 mb-4">{service.price}</p>
            <ul className="mb-6">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-center mb-2">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}