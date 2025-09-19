# Lab-Guide-Ice-Task
# Project README

## Overview

This project is a RESTful API built with Node.js and Express. It allows users to manage posts and user authentication. The API supports secure HTTPS connections, user registration, login, and CRUD operations for posts.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js to build APIs.
- **MongoDB**: NoSQL database to store user and post data.
- **JWT**: JSON Web Tokens for secure user authentication.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **Bcrypt**: Library to hash passwords.
- **Express Validator**: Middleware for validating request data.
- **Express Brute**: Middleware to prevent brute-force attacks.

## File Structure

```
/project-root
│
├── /routes
│   ├── post.mjs
│   └── user.mjs
│
├── /keys
│   ├── privatekey.pem
│   └── certificate.pem
│
├── /db
│   └── conn.mjs
│
├── index.mjs
└── .env
```

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/yourrepo.git
    cd yourrepo
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
    ```
    ATLAS_URL=mongodb+srv://username:password@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    JWT_SECRET=your_jwt_secret
    ```

4. Generate SSL certificates and place them in the `keys` directory.

## Usage

### Starting the Server

To start the server, run:

```bash
node index.mjs
```

The server will run on `https://localhost:30090`.

### API Endpoints

#### User Routes

- **POST /user/signup**: Register a new user.
- **POST /user/login**: Log in an existing user.

#### Post Routes

- **GET /post**: Retrieve all posts.
- **POST /post/upload**: Create a new post.
- **GET /post/:id**: Retrieve a single post by ID.
- **PATCH /post/:id**: Update a post by ID.
- **DELETE /post/:id**: Delete a post by ID.

### Middleware

- **CORS**: Allows requests from different origins.
- **JWT Authentication**: Secures routes using JWT tokens.

## Example Request

### User Signup

```http
POST /user/signup
Content-Type: application/json

{
    "name": "exampleUser",
    "password": "securePassword"
}
```

### User Login

```http
POST /user/login
Content-Type: application/json

{
    "name": "exampleUser",
    "password": "securePassword"
}
```

### Create a Post

```http
POST /post/upload
Authorization: Bearer <your_token>
Content-Type: application/json

{
    "user": "exampleUser",
    "content": "This is a new post.",
    "image": "url_to_image"
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.



