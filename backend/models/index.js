const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models here
db.users = require('./user.model')(sequelize, DataTypes);
db.quizzes = require('./quiz.model')(sequelize, DataTypes);
db.flashcards = require('./flashcard.model')(sequelize, DataTypes);

// Define associations here
db.users.hasMany(db.quizzes, { foreignKey: 'created_by' });
db.quizzes.belongsTo(db.users, { foreignKey: 'created_by' });

db.quizzes.hasMany(db.flashcards, { foreignKey: 'quiz_id' });
db.flashcards.belongsTo(db.quizzes, { foreignKey: 'quiz_id' });

module.exports = db;
