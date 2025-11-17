import express from 'express';
const router = express.Router();
import * as contactMessageController from '../controllers/contactMessageController.js';

// GET /api/contact-messages - Get all contact messages
router.get('/', contactMessageController.getAllContactMessages);

// GET /api/contact-messages/:id - Get single contact message
router.get('/:id', contactMessageController.getContactMessageById);

// POST /api/contact-messages - Create new contact message
router.post('/', contactMessageController.createContactMessage);

// PUT /api/contact-messages/:id - Update contact message
router.put('/:id', contactMessageController.updateContactMessage);

// DELETE /api/contact-messages/:id - Delete contact message
router.delete('/:id', contactMessageController.deleteContactMessage);

export default router;