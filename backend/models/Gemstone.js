const mongoose = require('mongoose');

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
  originKey: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  certified: {
    type: Boolean,
    default: false
  },
  isNew: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4
  }
}, {
  timestamps: true,
  suppressReservedKeysWarning: true
});

module.exports = mongoose.model('Gemstone', gemstoneSchema);