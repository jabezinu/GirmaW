import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, Sparkles } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', id: 'home', path: '/' },
    { name: 'Gemstones', id: 'gemstones', path: '/gemstones' },
    { name: 'Services', id: 'services', path: '/services' },
    { name: 'About', id: 'about', path: '/about' },
    { name: 'Contact', id: 'contact', path: '/contact' }
  ];

  // Get active tab from location
  const getActiveTab = () => {
    // Special case: '/' is Home
    if (location.pathname === '/') return 'Home';
    const found = navigation.find((item) => item.path === location.pathname);
    return found ? found.name : '';
  };
  const activeTab = getActiveTab();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      (location.pathname === '/' && !scrolled)
        ? 'bg-transparent'
        : 'bg-gradient-to-r from-white/90 via-cyan-50/70 to-blue-50/70 backdrop-blur-xl border-b border-cyan-200/40 shadow-lg shadow-cyan-500/10'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 group relative">
            <Link
              to="/"
              className="flex items-center gap-2 cursor-pointer transform transition-all duration-500 hover:scale-110"
            >
              <div className="relative">
                <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
                <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-50 animate-pulse" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent relative">
                GirmaWondimu
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent blur-sm opacity-50">
                  GirmaWondimu
                </span>
              </span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className={`relative flex items-center space-x-2 rounded-2xl p-2 border shadow-2xl ${
              (location.pathname === '/' && !scrolled)
                ? 'bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 backdrop-blur-xl border-cyan-300/40 shadow-cyan-500/20'
                : 'bg-gradient-to-r from-white/95 via-cyan-50/90 to-blue-50/90 backdrop-blur-md border-cyan-200/60 shadow-blue-500/10'
            }`}>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/5 via-blue-400/5 to-purple-500/5 animate-pulse" />
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`group relative px-6 py-3 rounded-xl text-sm font-bold transition-all duration-500 overflow-hidden ${
                    activeTab === item.name
                      ? ((location.pathname === '/' && !scrolled)
                          ? 'bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 text-white shadow-2xl shadow-cyan-500/60 transform scale-110'
                          : 'bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700 text-white shadow-xl shadow-blue-500/40 transform scale-110')
                      : ((location.pathname === '/' && !scrolled)
                          ? 'text-cyan-50 hover:text-white hover:bg-gradient-to-br hover:from-cyan-400/40 hover:via-blue-400/40 hover:to-purple-500/40 hover:scale-110 hover:shadow-xl hover:shadow-cyan-400/30'
                          : 'text-slate-700 hover:text-cyan-700 hover:bg-gradient-to-br hover:from-cyan-100 hover:via-blue-50 hover:to-purple-50 hover:scale-110 hover:shadow-lg hover:shadow-cyan-300/20')
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    textShadow: activeTab === item.name ? '0 2px 10px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                >
                  <div className="flex items-center space-x-2 relative z-10">
                    <span>{item.name}</span>
                    {activeTab === item.name && (
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    )}
                  </div>
                  {activeTab === item.name && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 opacity-30 animate-pulse" />
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 opacity-20 blur-lg animate-pulse" />
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-blue-400/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              ))}
            </div>
          </div>
         {/* Mobile menu button */}
         <div className="md:hidden">
           <button
             onClick={() => setIsOpen(!isOpen)}
             className="relative p-3 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 text-white shadow-2xl shadow-cyan-500/60 transition-all duration-500 hover:scale-110 hover:rotate-12 group"
           >
             <div className="relative z-10">
               {isOpen ? (
                 <X className="h-6 w-6 animate-spin" />
               ) : (
                 <MenuIcon className="h-6 w-6" />
               )}
             </div>
             <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-500 rounded-2xl opacity-30 blur-lg animate-pulse" />
           </button>
         </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-500 ease-out ${
          isOpen
            ? 'max-h-96 opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-4 overflow-hidden'
        }`}>
          <div className={`relative mx-4 mb-4 rounded-2xl border shadow-2xl overflow-hidden ${
            (location.pathname === '/' && !scrolled)
              ? 'bg-gradient-to-br from-cyan-500/15 via-blue-500/15 to-purple-500/15 backdrop-blur-2xl border-cyan-300/40 shadow-cyan-500/30'
              : 'bg-gradient-to-br from-white/98 via-cyan-50/95 to-blue-50/95 backdrop-blur-xl border-cyan-200/60 shadow-blue-500/20'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-blue-400/5 to-purple-500/5 animate-pulse" />
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`relative w-full flex items-center space-x-3 px-6 py-4 text-left font-bold transition-all duration-500 group ${
                  activeTab === item.name
                    ? ((location.pathname === '/' && !scrolled)
                        ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white shadow-lg shadow-cyan-500/40'
                        : 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 text-white shadow-md shadow-blue-500/30')
                    : ((location.pathname === '/' && !scrolled)
                        ? 'text-cyan-50 hover:bg-gradient-to-r hover:from-cyan-400/30 hover:via-blue-400/30 hover:to-purple-500/30 hover:text-white'
                        : 'text-slate-700 hover:bg-gradient-to-r hover:from-cyan-100 hover:via-blue-50 hover:to-purple-50 hover:text-cyan-700')
                } ${index !== navigation.length - 1 ? 'border-b border-cyan-200/30' : ''}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                  textShadow: activeTab === item.name ? '0 2px 8px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <span className="text-2xl relative z-10">{item.name.charAt(0)}</span>
                <span className="text-lg relative z-10">{item.name}</span>
                {activeTab === item.name && (
                  <div className="ml-auto flex items-center gap-2 relative z-10">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                )}
                {activeTab === item.name && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-500/20 animate-pulse" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}