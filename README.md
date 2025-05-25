# 📚 Book Review System

A full-stack web application for browsing, reviewing, and managing books. Users can register, log in, view books, submit reviews, and manage their profiles. Admin users can add new books to the platform.

---

## 🚀 Features

- 🔍 Browse books with cover images and detailed information  
- ✍️ Submit and read reviews for each book  
- 👤 User profiles with editable details  
- 🧑‍💻 Admins can add new books  
- 🔐 User authentication and session management  
- 🌐 Responsive UI built with Tailwind CSS  

---

## 🧭 Workflow Overview

1. Users visit the [**Live Website**](https://book-review-webp.netlify.app).  
   ![Home Page](https://github.com/user-attachments/assets/fc08e0ec-72ff-4641-9a27-3f0188de9476)

2. Browse books and click on any to view detailed reviews.  
   ![Book Details](https://github.com/user-attachments/assets/51fed137-6da1-4e07-b7cf-cb63e377748e)

3. To review or rate a book, users must log in.  
   ![Login Page](https://github.com/user-attachments/assets/a5fbb8ce-85af-4508-b028-9c81004e9125)  
   ![Login Demo](https://github.com/user-attachments/assets/fdd948a7-6ad7-4d41-87b4-6d9581f60b0e)

4. New users can register.  

---

## 🛂 Admin Access

To access admin features (e.g., adding books), log in with:

- **Email:** `adminuser@gmail.com`  
- **Password:** `Admin@400`  

Admin view:  
![Admin Dashboard](https://github.com/user-attachments/assets/0ed31717-7ca7-4ae6-9df4-cdd2f66488a1)

Submit reviews:  
![Submit Review](https://github.com/user-attachments/assets/e7816d32-7e4c-4ac5-ba12-cc885cdf16ee)

View profile:  
![Profile View](https://github.com/user-attachments/assets/bd46ade8-ab12-44b7-b4b8-a25a399ecb6e)

---

## 🛠 Tech Stack

**Frontend:**
- React
- React Router
- Tailwind CSS
- Context API
- Vite

**Backend:**
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication

---

## 🖥️ Live Demo

🌐 [https://book-review-webp.netlify.app](https://book-review-webp.netlify.app)

---

## ⚙️ Setup Instructions

### 📁 Backend Setup (Express + MongoDB)

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create environment file
touch .env

# 4. Add the following to .env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# 5. Update CORS (if needed for dev)
# In app.js or middleware setup
origin: 'http://localhost:5173'

# 6. Start the backend server
npm run dev
# Running at http://localhost:5000

### 💻 Frontend Setup (React + Vite)
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Create environment file
touch .env

# 4. Add this line to .env
VITE_API_URL=http://localhost:5000

# 5. Start the frontend dev server
npm run dev
# Running at http://localhost:5173
## 🔑 API Routes Overview

### 🧟‍♂️ Authentication

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| POST   | `/api/auth/register`  | Register new user        |
| POST   | `/api/auth/login`     | Login and receive JWT    |

---

### 📚 Books

| Method | Endpoint            | Description               |
|--------|---------------------|---------------------------|
| GET    | `/api/books`        | List all books            |
| GET    | `/api/books/:id`    | Get details of a book     |
| POST   | `/api/books`        | Add new book (Admin only) |

---

### 💬 Reviews

| Method | Endpoint                        | Description          |
|--------|---------------------------------|----------------------|
| GET    | `/api/books/:id/reviews`        | List all reviews     |
| POST   | `/api/books/:id/reviews`        | Submit a review      |

---

### 👤 Users

| Method | Endpoint             | Description           |
|--------|----------------------|-----------------------|
| GET    | `/api/users/:id`     | Get user profile      |
| PUT    | `/api/users/:id`     | Update user profile   |

---






