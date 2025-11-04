import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            GemStone Pro
          </Link>
          <ul className="hidden md:flex space-x-6">
            <li><Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link></li>
            <li><Link to="/gemstones" className="text-gray-700 hover:text-blue-600">Gemstones</Link></li>
            <li className="relative">
              <button
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
                className="text-gray-700 hover:text-blue-600 flex items-center"
              >
                Services
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isServicesOpen && (
                <ul className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 mt-1 w-48">
                  <li><Link to="/services/courses" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Courses</Link></li>
                  <li><Link to="/services/machines" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Machines</Link></li>
                  <li><Link to="/services/gemstone-testing" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Gemstone Testing Service</Link></li>
                  <li><Link to="/services/buying-selling" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Buying and Selling Gemstones</Link></li>
                </ul>
              )}
            </li>
            <li><Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link></li>
            <li><Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link></li>
          </ul>
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        <div className="md:hidden mt-4">
          <ul className="space-y-2">
            <li><Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link></li>
            <li><Link to="/gemstones" className="block text-gray-700 hover:text-blue-600">Gemstones</Link></li>
            <li><Link to="/services" className="block text-gray-700 hover:text-blue-600">Services</Link></li>
            <li><Link to="/about" className="block text-gray-700 hover:text-blue-600">About</Link></li>
            <li><Link to="/contact" className="block text-gray-700 hover:text-blue-600">Contact</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}