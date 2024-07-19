const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/quizRoutes'));
app.use('/api', require('./routes/flashcardRoutes'));

// Sync DB
db.sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
