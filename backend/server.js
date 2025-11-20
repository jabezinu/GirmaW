const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const gemstonesRouter = require('./routes/gemstones.js');
const coursesRouter = require('./routes/courses.js');
const equipmentsRouter = require('./routes/equipments.js');
const contactMessagesRouter = require('./routes/contactMessages.js');
const commentsRouter = require('./routes/comments.js');
const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dri04iflq',
  api_key: '265833691256595',
  api_secret: '_o-_u9uliTngb2CTqkfJssP_mU4'
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/gemstones', gemstonesRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/equipments', equipmentsRouter);
app.use('/api/contact-messages', contactMessagesRouter);
app.use('/api/comments', commentsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});