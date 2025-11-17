import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import contactMessageService from '../services/contactMessageService';

export default function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    rating: 5,
    location: ''
  });

  const translations = {
    en: {
      title: 'Contact Us',
      getInTouch: 'Get In Touch',
      description: "Have questions about our services or want to discuss a potential partnership? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      address: 'Address',
      addressValue: '123 Gem Street, Diamond City, DC 12345',
      phone: 'Phone',
      phoneValue: '+251941913877',
      email: 'Email',
      emailValue: 'info@gemstonepro.com',
      businessHours: 'Business Hours',
      businessHoursValue: 'Monday - Sunday: 9:00 AM - 6:00 PM',
      name: 'Name',
      subject: 'Subject',
      message: 'Message',
      sendMessage: 'Send Message',
      successMessage: 'Thank you for your message! We will get back to you soon.',
      reviewOnGoogleMaps: 'Review us on Google Maps'
    },
    am: {
      title: 'ያግኙን',
      getInTouch: 'ተገናኝ',
      description: 'ስለ አገልግሎታችን ጥያቄዎች አሉዎት ወይም ከእኛ ጋር መወያየት ይፈልጋሉ? ከእርስዎ መስማት እንፈልጋለን። መልእክት ይላኩልን እና በተቻለ ፍጥነት እንመልሳለን።',
      address: 'አድራሻ',
      addressValue: '123 የጌም ጎዳና፣ ዳይመንድ ከተማ፣ ዲሲ 12345',
      phone: 'ስልክ',
      phoneValue: '+251941913877',
      email: 'ኢሜይል',
      emailValue: 'info@gemstonepro.com',
      businessHours: 'የስራ ሰዓት',
      businessHoursValue: 'ሰኞ - እሁድ፡ ከጠዋቱ 9:00 - ከምሽቱ 6:00',
      name: 'ስም',
      subject: 'ርዕሰ ጉዳይ',
      message: 'መልእክት',
      sendMessage: 'መልእክት ላክ',
      successMessage: 'ለመልእክትዎ እናመሰግናለን! በቅርቡ እናገኝዎታለን።',
      reviewOnGoogleMaps: 'በጉግል ካርታ ላይ አስተያየት ስጡን'
    }
  };

  const t = translations[language];

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
      alert(t.successMessage);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">{t.title}</h1>

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
                <p className="text-gray-600">{t.phoneValue}</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-blue-600 mr-3">✉️</span>
              <div>
                <p className="font-semibold">{t.email}</p>
                <p className="text-gray-600">{t.emailValue}</p>
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
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">{t.name}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">{t.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">{t.subject}</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">{t.message}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="rating" className="block text-gray-700 font-semibold mb-2">Rating (1-5)</label>
              <select
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="location" className="block text-gray-700 font-semibold mb-2">Location (optional)</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
            >
              {t.sendMessage}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}