const db = require('../models');

exports.create = async (req, res) => {
  try {
    const { title, description } = req.body;
    const quiz = await db.quizzes.create({ title, description, created_by: req.user.id });
    res.status(201).send(quiz);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const quizzes = await db.quizzes.findAll();
    res.status(200).send(quizzes);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const quiz = await db.quizzes.findByPk(req.params.id);
    if (!quiz) {
      return res.status(404).send({ message: 'Quiz not found' });
    }
    res.status(200).send(quiz);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, description } = req.body;
    const [updated] = await db.quizzes.update({ title, description }, { where: { id: req.params.id } });
    if (!updated) {
      return res.status(404).send({ message: 'Quiz not found' });
    }
    const updatedQuiz = await db.quizzes.findByPk(req.params.id);
    res.status(200).send(updatedQuiz);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await db.quizzes.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).send({ message: 'Quiz not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
