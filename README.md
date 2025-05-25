BlogSpot Blogging Platform
==========================

A full-stack blogging application built with **React** for the frontend, **Node.js (Express)** for the backend, and **MySQL** as the database. This platform allows users to register, log in, create, read, update, and delete blog posts, and manage their own content.

✨ Features
----------

-   **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens).

-   **CRUD Operations**: Create, Read, Update, and Delete blog posts.

-   **Personalized Content**: View all blog posts, or filter to see only your own posts.

-   **Rich Text Editor**: Utilize CKEditor for a rich and intuitive post creation experience.

-   **Responsive Design**: A modern and responsive user interface built with Tailwind CSS and Material-UI icons.

🚀 Technologies Used
--------------------

### Frontend (Client)

-   React

-   React Router DOM

-   Axios (for API requests)

-   React Hook Form (for form management)

-   CKEditor 5 React & Classic Build

-   Tailwind CSS

-   PostCSS & Autoprefixer

-   Material-UI Icons (`@mui/icons-material`)

-   JWT-Decode

### Backend (Server)

-   Node.js

-   Express.js

-   MySQL2 (MySQL client for Node.js)

-   JSON Web Tokens (JWT)

-   Bcrypt (for password hashing)

-   Dotenv (for environment variables)

### Database

-   MySQL

🛠️ Setup and Installation
--------------------------

Follow these steps to get the project up and running on your local machine.

### 1\. Clone the Repository

```
git clone https://github.com/nishant-deshmukh/BlogSpot-Blogging-Platform.git
cd BlogSpot-Blogging-Platform

```

### 2\. Backend Setup (Server)

Navigate into the `Server` directory:

```
cd Server

```

#### Install Backend Dependencies

Install the necessary Node.js packages for the backend:

```
npm install
# Or, if you prefer to install specific packages:
# npm install express mysql2 dotenv jsonwebtoken bcryptjs

```

**Database Schema Setup:** You'll need to set up your MySQL database and tables. Here's a basic SQL schema to get started:

    ```
    -- Create Database
    CREATE DATABASE IF NOT EXISTS blogapp_db;
    USE blogapp_db;

    -- Create Users Table
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        img VARCHAR(255), -- Optional: for user profile image
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Create Posts Table
    CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        img VARCHAR(255), -- Optional: for post header image
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        uid INT NOT NULL,
        FOREIGN KEY (uid) REFERENCES users(id) ON DELETE CASCADE
    );

    ```
**Note:** Ensure your database name matches `DB_DATABASE` in your `.env` file.

### 3\. Frontend Setup (Client)

Navigate into the `Client` directory:

```
cd ../Client

```

#### Install Frontend Dependencies

Install the necessary Node.js packages for the frontend:

```
npm install
# Or, if you prefer to install specific packages:
# npm install @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic axios react-router-dom react-hook-form jwt-decode tailwindcss postcss autoprefixer @mui/icons-material

```

🏃 Running the Project
----------------------

### 1\. Start the Backend Server

Open a new terminal window, navigate to the `Server` directory, and start the Node.js server:

```
cd Server
node index.js

```

The backend server should start on `http://localhost:8080`.

### 2\. Start the Frontend Application

Open another new terminal window, navigate to the `Client` directory, and start the React development server:

```
cd Client
npm start

```

The React application should open in your browser, typically at `http://localhost:3000`.

🧪 API Endpoints (Postman)
--------------------------

Use Postman or a similar tool to test these endpoints.\
**Base URL:** `http://localhost:8080/api`
| Method | Endpoint | Description | Authentication Required |
| --- | --- | --- | --- |
| POST | /auth/login | Authenticate user and receive JWT token. | No |
| POST | /auth/register | Register a new user. | No |
| POST | /posts | Create a new blog post. | Yes (JWT in Header) |
| GET | /posts | Retrieve all blog posts. | No |
| GET | /posts/:id | Retrieve a single blog post by ID. | No |
| PUT | /posts/:id | Update an existing blog post by ID. | Yes (JWT in Header) |
| DELETE | /posts/:id | Delete a blog post by ID. | Yes (JWT in Header) |
| GET | /users/me/posts | Retrieve all blog posts by the authenticated user. | Yes (JWT in Header) |

**Example Request Header for Authenticated Endpoints:**

```
Authorization: Bearer <your_jwt_token_here>

```

📄 License
----------

This project is licensed under the MIT License - see the <LICENSE> file for details.
