import { Menu, X, ChevronRight, Star, Award, Globe, Users, ShoppingBag, TestTube, Wrench, GraduationCap, MessageCircle, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, Sparkles } from 'lucide-react';


export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-cyan-950 to-blue-950 text-gray-300 py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.1),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4 group">
              <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">GirmaWondimu</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Your trusted partner for premium gemstones since 2009.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/eseyael_11" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group">
                <div className="relative p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 transition-all duration-300">
                  <Instagram className="w-6 h-6 text-gray-400 group-hover:text-pink-400 cursor-pointer transition-colors duration-300 group-hover:scale-110" />
                </div>
              </a>
              <a href="https://www.tiktok.com/@eseyael" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="group">
                <div className="relative p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 cursor-pointer transition-colors duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </div>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group">
                <div className="relative p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300">
                  <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-blue-400 cursor-pointer transition-colors duration-300 group-hover:scale-110" />
                </div>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group">
                <div className="relative p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300">
                  <Facebook className="w-6 h-6 text-gray-400 group-hover:text-blue-400 cursor-pointer transition-colors duration-300 group-hover:scale-110" />
                </div>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group"><ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group"><ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group"><ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group"><ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start group hover:translate-x-1 transition-transform duration-300">
                <MapPin className="w-5 h-5 text-cyan-400 mr-3 mt-1 flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                <span className="text-gray-400">123 Gem Street, Diamond City, GD 12345</span>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center group hover:translate-x-1 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                  <span className="text-gray-400">+251935740257</span>
                </div>
                <div className="flex items-center group hover:translate-x-1 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                  <span className="text-gray-400">+251912407676</span>
                </div>
                <div className="flex items-center group hover:translate-x-1 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                  <span className="text-gray-400">920919720</span>
                </div>
              </div>
              <div className="flex items-center group hover:translate-x-1 transition-transform duration-300">
                <Mail className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                <span className="text-gray-400">info@girmawondimu.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cyan-900/50 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2 flex-wrap">
            © 2024 GirmaWondimu - GirmaWondimu. All rights reserved. | Designed with
            <span className="inline-flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold">love</span>
            </span>
            for gemstone enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
}