import express from 'express';
const router = express.Router();
import videoController from '../controllers/videoController.js';

// GET /api/videos - Get all videos
router.get('/', videoController.getAllVideos);

// GET /api/videos/:id - Get single video
router.get('/:id', videoController.getVideoById);

// POST /api/videos - Create new video
router.post('/', videoController.createVideo);

// PUT /api/videos/:id - Update video
router.put('/:id', videoController.updateVideo);

// DELETE /api/videos/:id - Delete video
router.delete('/:id', videoController.deleteVideo);

export default router;