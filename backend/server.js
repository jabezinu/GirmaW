import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import gemstonesRouter from './routes/gemstones.js';
import contactMessagesRouter from './routes/contactMessages.js';
import commentsRouter from './routes/comments.js';
import videosRouter from './routes/videos.js';
import authRouter from './routes/auth.js';
import faqsRouter from './routes/faqs.js';
import awardsRouter from './routes/awards.js';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dri04iflq',
  api_key: '265833691256595',
  api_secret: '_o-_u9uliTngb2CTqkfJssP_mU4'
});

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://taeemkurt:nQyQZVjUND3xDFZu@ac-znid8xu-shard-00-00.usti5w8.mongodb.net:27017,ac-znid8xu-shard-00-01.usti5w8.mongodb.net:27017,ac-znid8xu-shard-00-02.usti5w8.mongodb.net:27017/Girma?ssl=true&replicaSet=atlas-8zhmwz-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/gemstones', gemstonesRouter);
app.use('/api/contact-messages', contactMessagesRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/videos', videosRouter);
app.use('/api/faqs', faqsRouter);
app.use('/api/awards', awardsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});