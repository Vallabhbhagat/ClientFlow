# 🚀 ClientFlow

ClientFlow is a Full-Stack CRM (Customer Relationship Management) web application designed to help digital agencies and businesses efficiently manage clients, projects, and tasks in one centralized platform.

This project was developed as part of a Full Stack Developer Internship to demonstrate practical implementation of frontend, backend, and database integration.

---

## 🌟 Key Features

- 🔐 Secure Authentication System (Login / Signup)
- 👤 Admin Dashboard
- 🏢 Add & Manage Clients
- 📁 Add & Manage Projects
- ✅ Create & Assign Tasks to Team Members
- 📋 Member Dashboard (View Assigned Tasks Only)
- 🔄 Real-time Data Handling
- 📱 Responsive User Interface

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Update if different)

### Tools & Platforms
- Git & GitHub
- REST APIs
- Postman (API Testing)

---

## 📂 Project Structure
ClientFlow/
│
├── client/ # Frontend source code
├── server/ # Backend source code
├── routes/ # API routes
├── models/ # Database models
├── controllers/ # Business logic
├── package.json
└── README.md

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Vallabhbhagat/ClientFlow.git
cd ClientFlow

cd server
npm install

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

npm start
