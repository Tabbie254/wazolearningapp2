const { Quiz } = require('../models');

exports.getQuizzes = async () => {
  return Quiz.findAll();
};

// Add more methods (create, update, delete) as needed
