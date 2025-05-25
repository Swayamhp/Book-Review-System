# Book-Review-System
# 📚 Book Review App

A full-stack web application for browsing, reviewing, and managing books. Users can register, log in, view books, submit reviews, and manage their profiles.

### 1. Clone the Repository

```bash
git clone https://github.com/Swayamhp/Book-Review-System.git
cd book-review

## 🚀 Features

- 🔍 Browse books with cover images and details
- ✍️ Submit and read reviews for each book
- 👤 User profiles with editable information
- 🧑‍💻 Admins can add new books
- 🔐 User authentication and session management
- 🌐 Responsive UI using Tailwind CSS

## 🛠 Tech Stack

**Frontend:**
- React
- React Router
- Tailwind CSS
- Context API

**Backend:**
- Node.js
- Express
- MongoDB (Mongoose)

**Other:**
- JWT Authentication
- Vite (for frontend bundling)

## 🖥️ Live Demo

https://book-review-webp.netlify.app

## 📦 Setup Instructions

### Prerequisites
🛠 Backend Setup (Express + MongoDB)
1. Navigate to the backend folder
cd backend
2. Install dependencies
npm install
3. Create .env file in the server directory
touch .env
4. Add environment variables
PORT=5000 
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
5. remove cors origin of render origin:'https://book-review-webp.netlify.app' and replace to   origin: 'http://localhost:5173' the port number should same as react running port
6. Start the backend server
npm run dev
The server will start at: http://localhost:5000
7. To use demo book file you can use it from here  path= backend/books.json store some data into variable and insert into mongodb
8. example. insert into any of the controller
    const bookData = [{objs},{obj1}...];
     Book.insertMany(bookData);
🌐 Frontend Setup (React + Vite + Tailwind)
1. Navigate to the client folder
cd frontend
2. Install dependencies
npm install
3. Create .env file in the client directory
touch .env
4. Add API base URL
VITE_API_URL=http://localhost:5000
Make sure this URL matches the backend server URL.
5. Start the frontend dev server
npm run dev
The frontend will run at: http://localhost:5173
🔑 Default Routes Overview
Authentication
POST /api/auth/register – Create account

POST /api/auth/login – Login and get JWT

Books
GET /api/books – List all books

GET /api/books/:id – View one book

POST /api/books – Add a book (Admin only)

Reviews
GET /api/books/:id/reviews – Get reviews

POST /api/books/:id/reviews – Add review

Users
GET /api/users/:id – View user profile

PUT /api/users/:id – Update profile

GET /api/users/:id/reviews – Get user reviews




