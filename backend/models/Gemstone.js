import mongoose from 'mongoose';

const gemstoneSchema = new mongoose.Schema({
  nameKey: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['precious', 'semi-precious', 'organic']
  },
  quality: {
    type: String,
    required: true,
    enum: ['affordable', 'commercial', 'luxury']
  },
  hardness: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  // Detailed view fields (optional)
  mainPhoto: {
    type: String,
    required: false
  },
  galleryImages: [{
    type: String,
    required: false
  }],
  detailSections: [{
    title: {
      type: String,
      required: false
    },
    content: {
      type: String,
      required: false
    }
  }]
}, {
  timestamps: true,
  suppressReservedKeysWarning: true
});

export default mongoose.model('Gemstone', gemstoneSchema);