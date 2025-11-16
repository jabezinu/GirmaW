import Gemstone from '../models/Gemstone.js';

// Get all gemstones
export async function getAllGemstones(req, res) {
  try {
    const gemstones = await Gemstone.find();
    res.json(gemstones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single gemstone
export async function getGemstoneById(req, res) {
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
export async function createGemstone(req, res) {
  const gemstone = new Gemstone(req.body);
  try {
    const newGemstone = await gemstone.save();
    res.status(201).json(newGemstone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update gemstone
export async function updateGemstone(req, res) {
  try {
    const gemstone = await Gemstone.findByIdAndUpdate(
      req.params.id,
      req.body,
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
export async function deleteGemstone(req, res) {
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