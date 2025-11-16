import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import gemstonesRouter from './routes/gemstones.js';
import commentsRouter from './routes/comments.js';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dri04iflq',
  api_key: '265833691256595',
  api_secret: '_o-_u9uliTngb2CTqkfJssP_mU4'
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/gemstones', gemstonesRouter);
app.use('/api/comments', commentsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});