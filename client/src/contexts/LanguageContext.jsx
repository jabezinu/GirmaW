import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to 'am'
    return localStorage.getItem('language') || 'am';
  });

  const toggleLanguage = () => {
    const newLanguage = language === 'am' ? 'en' : 'am';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const translations = {
    am: {
      // Navigation
      brandName: "GirmaWondimu",
      home: "መነሻ",
      gemstones: "መአድኖች",
      services: "አገልግሎት",
      courses: "ትምህርቶች",
      machines: "ሜሻዎች",
      gemstoneTesting: "የማዕድን ምርመራ",
      buyingSelling: "መአድን ግዥና ሽያጭ",
      about: "ስለኛ",
      contact: "አድራሻ",
      languageButton: "English"
    },
    en: {
      // Navigation
      brandName: "GirmaWondimu",
      home: "Home",
      gemstones: "Gemstones",
      services: "Services",
      courses: "Courses",
      machines: "Machines",
      gemstoneTesting: "Gemstone Testing",
      buyingSelling: "Buying and Selling Gemstones",
      about: "About",
      contact: "Contact",
      languageButton: "አማርኛ"
    }
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations: t }}>
      {children}
    </LanguageContext.Provider>
  );
};