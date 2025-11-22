import mongoose from 'mongoose';
import Admin from './models/Admin.js';

const seedAdmin = async () => {
  try {
    await mongoose.connect('mongodb://taeemkurt:nQyQZVjUND3xDFZu@ac-znid8xu-shard-00-00.usti5w8.mongodb.net:27017,ac-znid8xu-shard-00-01.usti5w8.mongodb.net:27017,ac-znid8xu-shard-00-02.usti5w8.mongodb.net:27017/Girma?ssl=true&replicaSet=atlas-8zhmwz-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'girmaw' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create default admin
    const admin = new Admin({
      username: 'girmaw',
      password: '0987654321'
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Username: girmaw');
    console.log('Password: 0987654321');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
