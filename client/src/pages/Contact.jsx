import { useState } from 'react';
import toast from 'react-hot-toast';
import contactMessageService from '../services/contactMessageService';
import { Sparkles } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5,
    location: ''
  });

  // English text constants
  const t = {
    title: 'Contact Us',
    getInTouch: 'Get In Touch',
    description: "Have questions about our services or want to discuss a potential partnership? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    address: 'Address',
    addressValue: '123 Gem Street, Diamond City, DC 12345',
    phone: 'Phone',
    phoneValue: '+251935740257 / +251912407676 / +251920919720',
    email: 'Email',
    emailValue: 'info@tiletopal.com',
    businessHours: 'Business Hours',
    businessHoursValue: 'Monday - Sunday: 9:00 AM - 6:00 PM',
    name: 'Name',
    subject: 'Subject',
    message: 'Message',
    sendMessage: 'Send Message',
    successMessage: 'Thank you for your message! We will get back to you soon.',
    reviewOnGoogleMaps: 'Review us on Google Maps'
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactMessageService.create(formData);
      toast.success(t.successMessage);
      setFormData({ name: '', email: '', message: '', rating: 5, location: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.1),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.1),transparent_50%)]" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-12">
          <Sparkles className="w-10 h-10 text-cyan-500 animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 bg-clip-text text-transparent">{t.title}</h1>
          <Sparkles className="w-10 h-10 text-purple-500 animate-pulse" />
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">{t.getInTouch}</h2>
          <p className="text-gray-600 mb-8">
            {t.description}
          </p>

          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-blue-600 mr-3">📍</span>
              <div>
                <p className="font-semibold">{t.address}</p>
                <p className="text-gray-600">{t.addressValue}</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-blue-600 mr-3">📞</span>
              <div>
                <p className="font-semibold">{t.phone}</p>
                <p className="text-gray-600">
                  <a href="tel:+251935740257" className="hover:text-blue-600 transition-colors">+251935740257</a> /{' '}
                  <a href="tel:+251912407676" className="hover:text-blue-600 transition-colors">+251912407676</a> /{' '}
                  <a href="tel:+251920919720" className="hover:text-blue-600 transition-colors">+251920919720</a>
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-blue-600 mr-3">✉️</span>
              <div>
                <p className="font-semibold">{t.email}</p>
                <p className="text-gray-600">
                  <a href="mailto:info@tiletopal.com" className="hover:text-blue-600 transition-colors">{t.emailValue}</a>
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-blue-600 mr-3">🕒</span>
              <div>
                <p className="font-semibold">{t.businessHours}</p>
                <p className="text-gray-600">{t.businessHoursValue}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153168!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d4a32ddf9f0!2sMelbourne%20CBD%2C%20Victoria%2C%20Australia!5e0!3m2!1sen!2s!4v1633072800000!5m2!1sen!2s"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg shadow-md"
            ></iframe>
            <button
              onClick={() => window.open('https://www.google.com/maps/place/123+Gem+Street,+Diamond+City,+DC+12345', '_blank')}
              className="mt-4 w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition duration-300 font-semibold"
            >
              {t.reviewOnGoogleMaps}
            </button>
          </div>
        </div>

        <div>
          <div className="relative bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/30 p-8 rounded-2xl border border-cyan-200/50 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-blue-400/5 to-purple-500/5 animate-pulse" />
            <div className="relative z-10">
              <div className="mb-4">
                <label htmlFor="name" className="block text-slate-700 font-semibold mb-2">{t.name}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-slate-700 font-semibold mb-2">{t.email}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-slate-700 font-semibold mb-2">{t.message}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                ></textarea>
              </div>
              <div className="mb-6">
                <label htmlFor="location" className="block text-slate-700 font-semibold mb-2">Location (optional)</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="relative group w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-600 text-white py-4 px-4 rounded-lg transition-all duration-500 font-bold shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-blue-500/40 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {t.sendMessage}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}