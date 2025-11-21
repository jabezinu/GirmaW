import mongoose from 'mongoose';
import Gemstone from './models/Gemstone.js';
import Course from './models/Course.js';

const gemstonesData = [
  {
    nameKey: "blueSapphire",
    category: "precious",
    quality: "luxury",
    hardness: "9",
    image: "/src/assets/kal_asset/gemstones/blue-sapphire.jpg"
  },
  {
    nameKey: "ruby",
    category: "precious",
    quality: "luxury",
    hardness: "9",
    image: "/src/assets/kal_asset/gemstones/ruby.jpg"
  },
  {
    nameKey: "emerald",
    category: "precious",
    quality: "luxury",
    hardness: "7.5-8",
    image: "/src/assets/kal_asset/gemstones/emerald.jpg"
  },
  {
    nameKey: "pinkTourmaline",
    category: "semi-precious",
    quality: "commercial",
    hardness: "7-7.5",
    image: "/src/assets/kal_asset/gemstones/pink-tourmaline.jpg"
  },
  {
    nameKey: "aquamarine",
    category: "semi-precious",
    quality: "commercial",
    hardness: "7.5-8",
    image: "/src/assets/kal_asset/gemstones/aquamarine.jpg"
  },
  {
    nameKey: "amethyst",
    category: "semi-precious",
    quality: "affordable",
    hardness: "7",
    image: "/src/assets/kal_asset/gemstones/amethyst.jpg"
  },
  {
    nameKey: "yellowSapphire",
    category: "precious",
    quality: "luxury",
    hardness: "9",
    image: "/src/assets/kal_asset/gemstones/yellow-sapphire.jpg"
  },
  {
    nameKey: "tanzanite",
    category: "semi-precious",
    quality: "commercial",
    hardness: "6.5-7",
    image: "/src/assets/kal_asset/gemstones/tanzanite.jpg"
  },
  {
    nameKey: "garnet",
    category: "semi-precious",
    quality: "affordable",
    hardness: "6.5-7.5",
    image: "/src/assets/kal_asset/gemstones/garnet.jpg"
  },
  {
    nameKey: "citrine",
    category: "semi-precious",
    quality: "affordable",
    hardness: "7",
    image: "/src/assets/kal_asset/gemstones/citrine.jpg"
  },
  {
    nameKey: "topaz",
    category: "semi-precious",
    quality: "commercial",
    hardness: "8",
    image: "/src/assets/kal_asset/gemstones/blue-topaz.jpg"
  },
  {
    nameKey: "peridot",
    category: "semi-precious",
    quality: "affordable",
    hardness: "6.5-7",
    image: "/src/assets/kal_asset/gemstones/peridot.jpg"
  }
];

const coursesData = [
  {
    name: "Gemology Fundamentals",
    duration: "4 weeks",
    price: "299 ETB",
    level: "Beginner",
    description: "Introduction to gem identification, basic properties, and industry terminology",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
  },
  {
    name: "Advanced Gem Identification",
    duration: "8 weeks",
    price: "699 ETB",
    level: "Intermediate",
    description: "Master advanced testing techniques and equipment operation",
    image: "https://images.unsplash.com/photo-1605106702734-205df224ecce?w=400&h=300&fit=crop"
  },
  {
    name: "Professional Gemologist Certification",
    duration: "16 weeks",
    price: "1299 ETB",
    level: "Advanced",
    description: "Comprehensive professional training with industry certification",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop"
  },
  {
    name: "Gem Business & Marketing",
    duration: "6 weeks",
    price: "499 ETB",
    level: "All Levels",
    description: "Learn to start and grow your gemstone business",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://taeemkurt:nQyQZVjUND3xDFZu@ac-znid8xu-shard-00-00.usti5w8.mongodb.net:27017,ac-znid8xu-shard-00-01.usti5w8.mongodb.net:27017,ac-znid8xu-shard-00-02.usti5w8.mongodb.net:27017/yab?ssl=true&replicaSet=atlas-8zhmwz-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Gemstone.deleteMany({});
    console.log('Cleared existing gemstones');

    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Insert new data
    await Gemstone.insertMany(gemstonesData);
    console.log('Seeded gemstones successfully');

    await Course.insertMany(coursesData);
    console.log('Seeded courses successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();