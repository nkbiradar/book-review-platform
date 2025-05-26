# 📚 Book Review Platform

A full-stack web application where users can browse, review, and rate books. Built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

## 🔧 Features

- 🔐 User authentication with JWT
- 📖 Browse featured and full book list
- ⭐ Add reviews & ratings (authenticated users)
- 👤 Update user profile and upload profile photo
- 🌐 Responsive UI styled for modern UX
- ☁️ Images stored via Cloudinary
- 🧪 Seed script for adding books to database

---

## 🚀 Live Demo (Optional)
[🔗 Click here to visit the live app](https://book-review-platform-gamma.vercel.app/)  
> Add once deployed to Netlify / Render

🚀 Live Backend API (Optional)
[🔗 Click here to test the backend API](https://book-review-platform-l1u1.onrender.com/api)

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Axios, Toastify
- **Backend**: Node.js, Express, JWT, bcrypt
- **Database**: MongoDB Atlas
- **Image Upload**: Cloudinary

---

## 📦 Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/nkbiradar/book-review-platform.git
cd book-review-platform

Install dependencies:

For Backend:
cd server
npm install

For Frontend:
cd ../client
npm install

 Create a .env file in server/
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key

Seed Initial Books (Optional)
cd server
node seed.js

 Start the App
Backend:
cd server
npm run dev

Frontend:
cd client
npm start

📬 Contact
Made with ❤️ by nayan_kumar
