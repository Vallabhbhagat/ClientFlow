# 🚀 ClientFlow – Full Stack CRM for Digital Agencies

![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express.js](https://img.shields.io/badge/Framework-Express.js-lightgrey)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Status](https://img.shields.io/badge/Project-Completed-success)

ClientFlow is a full-stack Customer Relationship Management (CRM) web application built to help digital agencies efficiently manage **clients, projects, and tasks** in a centralized system.

Developed during a Full Stack Developer Internship, this project demonstrates real-world backend architecture, authentication systems, REST APIs, and responsive frontend integration.

---

## 📌 Problem Statement

Digital agencies often struggle with:
- Managing multiple clients
- Tracking project progress
- Assigning tasks to team members
- Maintaining workflow transparency

ClientFlow solves this by providing a structured admin and member dashboard system.

---

## ✨ Core Features

### 🔐 Authentication & Authorization
- Secure Login & Signup
- JWT-based authentication
- Role-based access (Admin / Member)

### 👨‍💼 Admin Functionalities
- Add & Manage Clients
- Create & Manage Projects
- Create & Assign Tasks
- Track team progress

### 👩‍💻 Member Functionalities
- View Assigned Tasks Only
- Track task status
- Clean and focused dashboard

### 📱 UI/UX
- Fully responsive design
- Clean dashboard layout
- Organized navigation

---

## 🛠️ Tech Stack

### 🔹 Frontend
- HTML5
- CSS3
- JavaScript
- React.js

### 🔹 Backend
- Node.js
- Express.js

### 🔹 Database
- MongoDB

### 🔹 Tools
- Git & GitHub
- Postman (API Testing)
- RESTful API Architecture

---

## 🏗️ Project Structure

```
ClientFlow/
│
├── client/              # Frontend Application
├── server/              # Backend Server
│   ├── routes/          # API Routes
│   ├── models/          # MongoDB Models
│   ├── controllers/     # Business Logic
│   └── middleware/      # Authentication Middleware
│
└── README.md
```
---

## ⚙️ Installation Guide

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Vallabhbhagat/ClientFlow.git
cd ClientFlow
```
2️⃣Backend Setup:
```
cd server
npm install
```

Create .env file inside server folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
start backend:
```
node server.js
```

3️⃣ Frontend Setup
```
cd ../client
npm install
npm start
```
Application will run on:
```
http://localhost:3000
```

---

## 🔄 Workflow

1. Admin logs in  
2. Admin adds clients  
3. Admin creates projects under clients  
4. Admin assigns tasks to team members  
5. Members log in and view only assigned tasks  

---

## 📊 Learning Outcomes

Through this project, I gained hands-on experience in:

- Building REST APIs  
- Authentication & Middleware implementation  
- MongoDB schema design  
- MVC architecture  
- Full-stack integration  
- Deployment-ready project structuring  

---

## 🚀 Future Enhancements

- Email Notifications  
- Task Deadlines & Reminders  
- File Upload System  
- Analytics Dashboard  
- Cloud Deployment (AWS / Render)  
- Docker Support  

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository  
2. Create a feature branch  
3. Commit your changes  
4. Push to your branch  
5. Open a Pull Request  

---

## 👨‍💻 Author

**Vallabh Bhagat**  
GitHub: https://github.com/Vallabhbhagat  

---

⭐ If you found this project helpful, consider giving it a star!
