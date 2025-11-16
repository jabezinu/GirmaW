import express from 'express';
const router = express.Router();
import * as commentController from '../controllers/commentController.js';

// GET /api/comments - Get all comments
router.get('/', commentController.getAllComments);

// GET /api/comments/:id - Get single comment
router.get('/:id', commentController.getCommentById);

// POST /api/comments - Create new comment
router.post('/', commentController.createComment);

// PUT /api/comments/:id - Update comment
router.put('/:id', commentController.updateComment);

// DELETE /api/comments/:id - Delete comment
router.delete('/:id', commentController.deleteComment);

export default router;