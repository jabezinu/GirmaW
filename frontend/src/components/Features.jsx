export default function Features() {
  const features = [
    {
      title: "Gemstone Testing",
      description: "Professional gemstone authentication and quality assessment using advanced equipment.",
      icon: "🔍"
    },
    {
      title: "Buying & Selling",
      description: "Connect with buyers and sellers worldwide for the best gemstone deals.",
      icon: "💎"
    },
    {
      title: "Training Courses",
      description: "Learn from experts with comprehensive courses on gemstone identification and trading.",
      icon: "🎓"
    },
    {
      title: "Equipment Sales",
      description: "High-quality tools and machinery for gemstone professionals and enthusiasts.",
      icon: "⚙️"
    },
    {
      title: "International Trade",
      description: "Facilitating global gemstone commerce with trusted partnerships.",
      icon: "🌍"
    },
    {
      title: "Expert Consultation",
      description: "Get advice from seasoned professionals in the gemstone industry.",
      icon: "👨‍💼"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}