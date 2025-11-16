import mongoose from 'mongoose';
import Gemstone from './models/Gemstone.js';

const gemstonesData = [
  {
    nameKey: "blueSapphire",
    category: "precious",
    quality: "luxury",
    hardness: "9",
    originKey: "ceylon",
    price: 2500,
    image: "/src/assets/kal_asset/gemstones/blue-sapphire.jpg",
    certified: true,
    isNew: true,
    rating: 5
  },
  {
    nameKey: "ruby",
    category: "precious",
    quality: "luxury",
    hardness: "9",
    originKey: "burma",
    price: 3200,
    image: "/src/assets/kal_asset/gemstones/ruby.jpg",
    certified: true,
    isNew: true,
    rating: 5
  },
  {
    nameKey: "emerald",
    category: "precious",
    quality: "luxury",
    hardness: "7.5-8",
    originKey: "colombia",
    price: 2800,
    image: "/src/assets/kal_asset/gemstones/emerald.jpg",
    certified: true,
    isNew: false,
    rating: 5
  },
  {
    nameKey: "pinkTourmaline",
    category: "semi-precious",
    quality: "commercial",
    hardness: "7-7.5",
    originKey: "brazil",
    price: 1500,
    image: "/src/assets/kal_asset/gemstones/pink-tourmaline.jpg",
    certified: true,
    isNew: false,
    rating: 4
  },
  {
    nameKey: "aquamarine",
    category: "semi-precious",
    quality: "commercial",
    hardness: "7.5-8",
    originKey: "pakistan",
    price: 1800,
    image: "/src/assets/kal_asset/gemstones/aquamarine.jpg",
    certified: true,
    isNew: true,
    rating: 5
  },
  {
    nameKey: "amethyst",
    category: "semi-precious",
    quality: "affordable",
    hardness: "7",
    originKey: "uruguay",
    price: 950,
    image: "/src/assets/kal_asset/gemstones/amethyst.jpg",
    certified: true,
    isNew: false,
    rating: 4
  },
  {
    nameKey: "yellowSapphire",
    category: "precious",
    quality: "luxury",
    hardness: "9",
    originKey: "ceylon",
    price: 2200,
    image: "/src/assets/kal_asset/gemstones/yellow-sapphire.jpg",
    certified: true,
    isNew: false,
    rating: 5
  },
  {
    nameKey: "tanzanite",
    category: "semi-precious",
    quality: "commercial",
    hardness: "6.5-7",
    originKey: "tanzania",
    price: 1900,
    image: "/src/assets/kal_asset/gemstones/tanzanite.jpg",
    certified: true,
    isNew: true,
    rating: 5
  },
  {
    nameKey: "garnet",
    category: "semi-precious",
    quality: "affordable",
    hardness: "6.5-7.5",
    originKey: "madagascar",
    price: 850,
    image: "/src/assets/kal_asset/gemstones/garnet.jpg",
    certified: false,
    isNew: false,
    rating: 4
  },
  {
    nameKey: "citrine",
    category: "semi-precious",
    quality: "affordable",
    hardness: "7",
    originKey: "brazil",
    price: 680,
    image: "/src/assets/kal_asset/gemstones/citrine.jpg",
    certified: true,
    isNew: false,
    rating: 4
  },
  {
    nameKey: "topaz",
    category: "semi-precious",
    quality: "commercial",
    hardness: "8",
    originKey: "brazil",
    price: 1200,
    image: "/src/assets/kal_asset/gemstones/blue-topaz.jpg",
    certified: true,
    isNew: false,
    rating: 4
  },
  {
    nameKey: "peridot",
    category: "semi-precious",
    quality: "affordable",
    hardness: "6.5-7",
    originKey: "pakistan",
    price: 750,
    image: "/src/assets/kal_asset/gemstones/peridot.jpg",
    certified: false,
    isNew: false,
    rating: 4
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.r86rdl3.mongodb.net/?appName=Cluster0');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Gemstone.deleteMany({});
    console.log('Cleared existing gemstones');

    // Insert new data
    await Gemstone.insertMany(gemstonesData);
    console.log('Seeded gemstones successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();