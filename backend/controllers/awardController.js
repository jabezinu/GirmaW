import Award from '../models/Award.js';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Export upload middleware
export const uploadSingle = upload.single('image');

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'awards', resource_type: 'auto' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    });
};

// Get all awards
export const getAllAwards = async function (req, res) {
    try {
        const awards = await Award.find().sort({ displayOrder: 1, dateReceived: -1 });
        res.json(awards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single award
export const getAwardById = async function (req, res) {
    try {
        const award = await Award.findById(req.params.id);
        if (!award) {
            return res.status(404).json({ message: 'Award not found' });
        }
        res.json(award);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create award
export const createAward = async function (req, res) {
    try {
        let imageUrl = '';

        // Handle image upload
        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file.buffer);
        }

        const awardData = {
            ...req.body,
            image: imageUrl,
            dateReceived: req.body.dateReceived || new Date()
        };

        const award = new Award(awardData);
        const newAward = await award.save();
        res.status(201).json(newAward);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update award
export const updateAward = async function (req, res) {
    try {
        let updateData = { ...req.body };

        // Handle image upload if new image provided
        if (req.file) {
            const imageUrl = await uploadToCloudinary(req.file.buffer);
            updateData.image = imageUrl;
        }

        const award = await Award.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!award) {
            return res.status(404).json({ message: 'Award not found' });
        }
        res.json(award);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete award
export const deleteAward = async function (req, res) {
    try {
        const award = await Award.findByIdAndDelete(req.params.id);
        if (!award) {
            return res.status(404).json({ message: 'Award not found' });
        }
        res.json({ message: 'Award deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { getAllAwards, getAwardById, createAward, updateAward, deleteAward };
