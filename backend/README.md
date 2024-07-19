 A detailed `README.md` for your backend project. This documentation will cover the setup, configuration, usage, and API endpoints for your Node.js backend connected to MySQL.

### `README.md`

```markdown
# Wazo Backend

The Wazo backend is a Node.js application that serves as the backend for the Wazo interactive learning app. It is built with Express.js and connects to a MySQL database using Sequelize ORM. This documentation provides details on how to set up, configure, and use the backend.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)

### Cloning the Repository

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/wazo-backend.git
    ```

2. Navigate to the backend directory:

    ```bash
    cd wazo-backend
    ```

### Installing Dependencies

1. Install the required npm packages:

    ```bash
    npm install
    ```

## Configuration

### Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=wazo_db
JWT_SECRET=your_jwt_secret
PORT=5000
```

- `DB_HOST`: The hostname of your MySQL database server.
- `DB_USER`: The username for the MySQL database.
- `DB_PASSWORD`: The password for the MySQL database.
- `DB_NAME`: The name of the MySQL database.
- `JWT_SECRET`: The secret key used for signing JWT tokens.
- `PORT`: The port on which the server will run (default is 5000).

## Running the Application

1. Start the server:

    ```bash
    npm start
    ```

   This will run the server on `http://localhost:5000` (or the port specified in the `.env` file).

2. To run the server in development mode with automatic restarts on changes, use:

    ```bash
    npm run dev
    ```

## API Endpoints

### Authentication

- **POST /api/auth/login**

  Logs in a user and returns a JWT token.

  **Request Body:**

  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

  **Response:**

  ```json
  {
    "token": "jwt_token_here"
  }
  ```

- **POST /api/auth/register**

  Registers a new user.

  **Request Body:**

  ```json
  {
    "username": "username",
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

  **Response:**

  ```json
  {
    "id": 1,
    "username": "username",
    "email": "user@example.com"
  }
  ```

### Quizzes

- **GET /api/quizzes**

  Retrieves a list of all quizzes.

  **Response:**

  ```json
  [
    {
      "id": 1,
      "title": "Sample Quiz",
      "description": "This is a sample quiz."
    }
  ]
  ```

- **POST /api/quizzes**

  Creates a new quiz.

  **Request Body:**

  ```json
  {
    "title": "New Quiz",
    "description": "Description of the new quiz."
  }
  ```

  **Response:**

  ```json
  {
    "id": 2,
    "title": "New Quiz",
    "description": "Description of the new quiz."
  }
  ```

### Flashcards

- **GET /api/flashcards**

  Retrieves a list of all flashcards.

  **Response:**

  ```json
  [
    {
      "id": 1,
      "question": "Sample Question?",
      "answer": "Sample Answer."
    }
  ]
  ```

- **POST /api/flashcards**

  Creates a new flashcard.

  **Request Body:**

  ```json
  {
    "question": "What is React?",
    "answer": "A JavaScript library for building user interfaces."
  }
  ```

  **Response:**

  ```json
  {
    "id": 2,
    "question": "What is React?",
    "answer": "A JavaScript library for building user interfaces."
  }
  ```

## Testing

### Running Tests

To run tests, use:

```bash
npm test
```

Ensure you have configured any required environment variables for testing.

## Contributing

We welcome contributions to the Wazo backend. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Submit a pull request with a clear description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

If you have any questions or need further assistance, please reach out via [email](mailto:youremail@example.com) or open an issue in the repository.

```

### Key Points

- **Installation**: Guides users through cloning the repository and installing dependencies.
- **Configuration**: Describes necessary environment variables and how to set them up.
- **Running the Application**: Provides instructions on how to start the server.
- **API Endpoints**: Documents the available API routes, their request and response formats.
- **Testing**: Instructions for running tests.
- **Contributing**: Guidelines for contributing to the project.
- **License**: Specifies the licensing details.

This detailed `README.md` will help users and developers understand how to set up, configure, and use the backend, as well as how to contribute to the project. 