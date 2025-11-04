import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            GemStone Pro
          </Link>
          <ul className="hidden md:flex space-x-6">
            <li><Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link></li>
            <li><Link to="/products" className="text-gray-700 hover:text-blue-600">Products</Link></li>
            <li><Link to="/services" className="text-gray-700 hover:text-blue-600">Services</Link></li>
            <li><Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link></li>
            <li><Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link></li>
          </ul>
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}