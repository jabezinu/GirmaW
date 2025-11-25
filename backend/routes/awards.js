import express from 'express';
const router = express.Router();
import awardController, { uploadSingle } from '../controllers/awardController.js';
import { authenticateAdmin } from '../middleware/auth.js';

// GET /api/awards - Get all awards (public)
router.get('/', awardController.getAllAwards);

// GET /api/awards/:id - Get single award (public)
router.get('/:id', awardController.getAwardById);

// POST /api/awards - Create new award (protected)
router.post('/', authenticateAdmin, uploadSingle, awardController.createAward);

// PUT /api/awards/:id - Update award (protected)
router.put('/:id', authenticateAdmin, uploadSingle, awardController.updateAward);

// DELETE /api/awards/:id - Delete award (protected)
router.delete('/:id', authenticateAdmin, awardController.deleteAward);

export default router;
