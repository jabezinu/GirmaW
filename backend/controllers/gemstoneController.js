const Gemstone = require('../models/Gemstone');

// Get all gemstones
exports.getAllGemstones = async (req, res) => {
  try {
    const gemstones = await Gemstone.find();
    res.json(gemstones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single gemstone
exports.getGemstoneById = async (req, res) => {
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
exports.createGemstone = async (req, res) => {
  const gemstone = new Gemstone(req.body);
  try {
    const newGemstone = await gemstone.save();
    res.status(201).json(newGemstone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update gemstone
exports.updateGemstone = async (req, res) => {
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
exports.deleteGemstone = async (req, res) => {
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