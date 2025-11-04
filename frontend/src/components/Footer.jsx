import { Menu, X, ChevronRight, Star, Award, Globe, Users, ShoppingBag, TestTube, Wrench, GraduationCap, MessageCircle, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';


export default function Footer() {
  return (
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-4">
                <Award className="w-8 h-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold text-white">GemStone Elite</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner for premium gemstones since 2009.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 hover:text-blue-400 cursor-pointer transition" />
                <Instagram className="w-6 h-6 hover:text-pink-400 cursor-pointer transition" />
                <Linkedin className="w-6 h-6 hover:text-blue-500 cursor-pointer transition" />
                <Youtube className="w-6 h-6 hover:text-red-500 cursor-pointer transition" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Services</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition">Buy Gemstones</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Sell Gemstones</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Gemstone Testing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Training Courses</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Equipment</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <span>123 Gem Street, Diamond City, GD 12345</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                  <span>info@gemstoneelite.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 GemStone Elite. All rights reserved. | Designed with ❤️ for gemstone enthusiasts
            </p>
          </div>
        </div>
      </footer>
  );
}