import express from 'express';
const router = express.Router();
import * as gemstoneController from '../controllers/gemstoneController.js';

// GET /api/gemstones - Get all gemstones
router.get('/', gemstoneController.getAllGemstones);

// GET /api/gemstones/:id - Get single gemstone
router.get('/:id', gemstoneController.getGemstoneById);

// POST /api/gemstones - Create new gemstone
router.post('/', gemstoneController.createGemstone);

// PUT /api/gemstones/:id - Update gemstone
router.put('/:id', gemstoneController.updateGemstone);

// DELETE /api/gemstones/:id - Delete gemstone
router.delete('/:id', gemstoneController.deleteGemstone);

export default router;