export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">About GemStone Pro</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2010, GemStone Pro has been at the forefront of the gemstone industry, serving both local and international markets with unparalleled expertise and integrity.
            </p>
            <p className="text-gray-600 mb-4">
              Our journey began with a simple mission: to bridge the gap between gemstone enthusiasts, professionals, and the global market. Today, we are recognized as a trusted partner in the gemstone community.
            </p>
            <p className="text-gray-600">
              With years of experience and a team of certified gemologists, we provide comprehensive services that cater to every aspect of the gemstone business.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Our Expertise</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span className="text-gray-600">Certified gemstone testing and authentication</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span className="text-gray-600">International buying and selling network</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span className="text-gray-600">Professional training and certification programs</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span className="text-gray-600">State-of-the-art equipment and tools</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span className="text-gray-600">Market analysis and trend forecasting</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">Committed to the highest standards in everything we do</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-semibold mb-2">Trust</h3>
              <p className="text-gray-600">Building lasting relationships based on integrity and reliability</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">Embracing new technologies and methods in gemstone services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}