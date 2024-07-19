const mysql = require('mysql2');
require('dotenv').config();

// Database configuration from environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'yourpassword',
};

// Database and schema names
const username = process.env.DB_USER || 'defaultUser'; // Change this based on your logic
const databaseName = `wazoschema_${username}`; // Unique schema name for each user

// Create connection to MySQL server
const connection = mysql.createConnection(dbConfig);

// Function to execute a query and handle errors
const executeQuery = (query, connection) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        console.error(`Error executing query: ${error.message}`);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// Setup database and tables
const setupDatabase = async () => {
  try {
    // Connect to MySQL server
    connection.connect();

    // Check if database exists and create if not
    const checkDatabaseQuery = `SHOW DATABASES LIKE '${databaseName}'`;
    const databases = await executeQuery(checkDatabaseQuery, connection);
    if (databases.length === 0) {
      console.log(`Database ${databaseName} does not exist. Creating...`);
      await executeQuery(`CREATE DATABASE ${databaseName}`, connection);
    } else {
      console.log(`Database ${databaseName} already exists.`);
    }

    // Use the specified database
    await executeQuery(`USE ${databaseName}`, connection);

    // Define the schema creation queries
    const createTablesSQL = `
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS Quizzes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES Users(id) ON DELETE SET NULL
      );

      CREATE TABLE IF NOT EXISTS Flashcards (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        quiz_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (quiz_id) REFERENCES Quizzes(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS UserQuizProgress (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        quiz_id INT,
        score INT,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
        FOREIGN KEY (quiz_id) REFERENCES Quizzes(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS UserFlashcardProgress (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        flashcard_id INT,
        attempts INT DEFAULT 0,
        correct_attempts INT DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
        FOREIGN KEY (flashcard_id) REFERENCES Flashcards(id) ON DELETE CASCADE
      );
    `;

    // Create tables
    await executeQuery(createTablesSQL, connection);

    console.log('Database and tables are ready');

  } catch (error) {
    console.error('Error setting up database and tables:', error.message);
  } finally {
    // Close the connection
    connection.end();
  }

  const fs = require('fs');

  try {
      // Simulate schema creation
      console.log('Creating schema...');
      
      // Example: Write to a file as a placeholder for schema creation logic
      fs.writeFileSync('schema.txt', 'Schema created');
      
      console.log('Schema created successfully!');
  } catch (error) {
      console.error('Error creating schema:', error);
  }
};

// Run the setup script
setupDatabase();
