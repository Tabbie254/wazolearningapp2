const express = require('express');
const router = express.Router();
const flashcardController = require('../controllers/flashcard.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Create a new flashcard
router.post('/flashcards', authMiddleware, flashcardController.create);

// Get all flashcards
router.get('/flashcards', authMiddleware, flashcardController.findAll);

// Get a single flashcard by id
router.get('/flashcards/:id', authMiddleware, flashcardController.findOne);

// Update a flashcard by id
router.put('/flashcards/:id', authMiddleware, flashcardController.update);

// Delete a flashcard by id
router.delete('/flashcards/:id', authMiddleware, flashcardController.delete);

module.exports = router;
