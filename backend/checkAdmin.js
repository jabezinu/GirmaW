import mongoose from 'mongoose';
import Admin from './models/Admin.js';

const checkAdmin = async () => {
    try {
        await mongoose.connect('mongodb://taeemkurt:nQyQZVjUND3xDFZu@ac-znid8xu-shard-00-00.usti5w8.mongodb.net:27017,ac-znid8xu-shard-00-01.usti5w8.mongodb.net:27017,ac-znid8xu-shard-00-02.usti5w8.mongodb.net:27017/yab?ssl=true&replicaSet=atlas-8zhmwz-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to MongoDB');

        // Find all admins
        const admins = await Admin.find({});
        console.log('\nAll admin users:');
        admins.forEach(admin => {
            console.log(`- Username: ${admin.username}, ID: ${admin._id}`);
        });

        // Check if girmaw exists
        const girmawAdmin = await Admin.findOne({ username: 'girmaw' });
        if (girmawAdmin) {
            console.log('\n✅ Admin "girmaw" exists');
            // Test password
            const isValid = await girmawAdmin.comparePassword('0987654321');
            console.log(`Password "0987654321" is ${isValid ? 'VALID ✅' : 'INVALID ❌'}`);
        } else {
            console.log('\n❌ Admin "girmaw" does not exist');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkAdmin();
