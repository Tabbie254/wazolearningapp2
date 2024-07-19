const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Create a new quiz
router.post('/quizzes', authMiddleware, quizController.create);

// Get all quizzes
router.get('/quizzes', authMiddleware, quizController.findAll);

// Get a single quiz by id
router.get('/quizzes/:id', authMiddleware, quizController.findOne);

// Update a quiz by id
router.put('/quizzes/:id', authMiddleware, quizController.update);

// Delete a quiz by id
router.delete('/quizzes/:id', authMiddleware, quizController.delete);

module.exports = router;
