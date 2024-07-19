const db = require('../models');

exports.create = async (req, res) => {
  try {
    const { question, answer, quiz_id } = req.body;
    const flashcard = await db.flashcards.create({ question, answer, quiz_id });
    res.status(201).send(flashcard);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const flashcards = await db.flashcards.findAll();
    res.status(200).send(flashcards);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const flashcard = await db.flashcards.findByPk(req.params.id);
    if (!flashcard) {
      return res.status(404).send({ message: 'Flashcard not found' });
    }
    res.status(200).send(flashcard);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const [updated] = await db.flashcards.update({ question, answer }, { where: { id: req.params.id } });
    if (!updated) {
      return res.status(404).send({ message: 'Flashcard not found' });
    }
    const updatedFlashcard = await db.flashcards.findByPk(req.params.id);
    res.status(200).send(updatedFlashcard);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await db.flashcards.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).send({ message: 'Flashcard not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
