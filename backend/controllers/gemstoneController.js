import Gemstone from '../models/Gemstone.js';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Export upload middleware for multiple files
export const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'mainPhoto', maxCount: 1 },
  { name: 'video360', maxCount: 1 }
]);

// Export single upload for backwards compatibility
export { upload };

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'gemstones', resource_type: 'auto' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

// Get all gemstones
export const getAllGemstones = async function (req, res) {
  try {
    const gemstones = await Gemstone.find();
    res.json(gemstones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single gemstone
export const getGemstoneById = async function (req, res) {
  try {
    const gemstone = await Gemstone.findById(req.params.id);
    if (!gemstone) {
      return res.status(404).json({ message: 'Gemstone not found' });
    }
    res.json(gemstone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create gemstone
export const createGemstone = async function (req, res) {
  try {
    let imageUrl = '';
    let mainPhotoUrl = '';
    let video360Url = '';

    // Handle multiple file uploads
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        imageUrl = await uploadToCloudinary(req.files.image[0].buffer);
      }
      if (req.files.mainPhoto && req.files.mainPhoto[0]) {
        mainPhotoUrl = await uploadToCloudinary(req.files.mainPhoto[0].buffer);
      }
      if (req.files.video360 && req.files.video360[0]) {
        video360Url = await uploadToCloudinary(req.files.video360[0].buffer);
      }
    }

    // Parse detailSections if it's a JSON string
    let detailSections = [];
    if (req.body.detailSections) {
      try {
        detailSections = typeof req.body.detailSections === 'string'
          ? JSON.parse(req.body.detailSections)
          : req.body.detailSections;
      } catch (e) {
        console.error('Error parsing detailSections:', e);
      }
    }

    const gemstoneData = {
      ...req.body,
      image: imageUrl,
      mainPhoto: mainPhotoUrl || undefined,
      video360: video360Url || undefined,
      detailSections: detailSections.length > 0 ? detailSections : undefined
    };

    const gemstone = new Gemstone(gemstoneData);
    const newGemstone = await gemstone.save();
    res.status(201).json(newGemstone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update gemstone
export const updateGemstone = async function (req, res) {
  try {
    let updateData = { ...req.body };

    // Handle multiple file uploads
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        const imageUrl = await uploadToCloudinary(req.files.image[0].buffer);
        updateData.image = imageUrl;
      }
      if (req.files.mainPhoto && req.files.mainPhoto[0]) {
        const mainPhotoUrl = await uploadToCloudinary(req.files.mainPhoto[0].buffer);
        updateData.mainPhoto = mainPhotoUrl;
      }
      if (req.files.video360 && req.files.video360[0]) {
        const video360Url = await uploadToCloudinary(req.files.video360[0].buffer);
        updateData.video360 = video360Url;
      }
    }

    // Parse detailSections if it's a JSON string
    if (req.body.detailSections) {
      try {
        updateData.detailSections = typeof req.body.detailSections === 'string'
          ? JSON.parse(req.body.detailSections)
          : req.body.detailSections;
      } catch (e) {
        console.error('Error parsing detailSections:', e);
      }
    }

    const gemstone = await Gemstone.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!gemstone) {
      return res.status(404).json({ message: 'Gemstone not found' });
    }
    res.json(gemstone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete gemstone
export const deleteGemstone = async function (req, res) {
  try {
    const gemstone = await Gemstone.findByIdAndDelete(req.params.id);
    if (!gemstone) {
      return res.status(404).json({ message: 'Gemstone not found' });
    }
    res.json({ message: 'Gemstone deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { getAllGemstones, getGemstoneById, createGemstone, updateGemstone, deleteGemstone };