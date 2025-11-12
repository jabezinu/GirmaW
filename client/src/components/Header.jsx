import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Languages } from 'lucide-react';

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const timeoutRef = useRef(null);
  const { toggleLanguage, translations } = useLanguage();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150); // 150ms delay
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            {translations.brandName}
          </Link>
          <ul className="hidden md:flex space-x-6">
            <li><Link to="/" className="text-gray-700 hover:text-blue-600">{translations.home}</Link></li>
            <li><Link to="/gemstones" className="text-gray-700 hover:text-blue-600">{translations.gemstones}</Link></li>
            <li className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Link to="/services" className="text-gray-700 hover:text-blue-600 flex items-center">
                {translations.services}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {isServicesOpen && (
                <ul className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 mt-1 w-48">
                  <li><Link to="/services#gemstone-testing" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{translations.gemstoneTesting}</Link></li>
                  <li><Link to="/services#buying-selling" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{translations.buyingSelling}</Link></li>
                  <li><Link to="/services#courses" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{translations.courses}</Link></li>
                  <li><Link to="/services#machines" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{translations.machines}</Link></li>
                </ul>
              )}
            </li>
            <li><Link to="/about" className="text-gray-700 hover:text-blue-600">{translations.about}</Link></li>
            <li><Link to="/contact" className="text-gray-700 hover:text-blue-600">{translations.contact}</Link></li>
          </ul>
          <button
            onClick={toggleLanguage}
            className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition"
          >
            <Languages className="w-5 h-5" />
            <span className="font-semibold">{translations.languageButton}</span>
          </button>
          <button className="md:hidden ml-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        <div className="md:hidden mt-4">
          <ul className="space-y-2">
            <li><Link to="/" className="block text-gray-700 hover:text-blue-600">{translations.home}</Link></li>
            <li><Link to="/gemstones" className="block text-gray-700 hover:text-blue-600">{translations.gemstones}</Link></li>
            <li className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center text-gray-700 hover:text-blue-600 w-full text-left"
              >
                {translations.services}
                <svg className={`w-4 h-4 ml-1 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isServicesOpen && (
                <ul className="ml-4 mt-2 space-y-1">
                  <li><Link to="/services#gemstone-testing" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">{translations.gemstoneTesting}</Link></li>
                  <li><Link to="/services#buying-selling" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">{translations.buyingSelling}</Link></li>
                  <li><Link to="/services#courses" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">{translations.courses}</Link></li>
                  <li><Link to="/services#machines" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">{translations.machines}</Link></li>
                </ul>
              )}
            </li>
            <li><Link to="/about" className="block text-gray-700 hover:text-blue-600">{translations.about}</Link></li>
            <li><Link to="/contact" className="block text-gray-700 hover:text-blue-600">{translations.contact}</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}