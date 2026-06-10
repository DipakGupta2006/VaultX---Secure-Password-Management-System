# 🔐 VaultX – Secure Password Management System

A modern and secure password management system built with **Node.js, Express.js, EJS, and MySQL**. VaultX helps users store, organize, generate, and manage passwords safely through an intuitive web interface.

## 🚀 Overview

Managing dozens of passwords across different platforms can be challenging. VaultX provides a centralized and secure solution for storing credentials, organizing them into categories, generating strong passwords, and tracking password security.

This project is being developed as a full-stack backend-focused application to strengthen concepts such as authentication, database design, CRUD operations, security, and Express.js development.

---

## ✨ Features

### 🔑 Authentication

* User Registration
* Secure Login System
* Logout Functionality
* Password Hashing with bcrypt
* Session Management

### 🛡️ Password Management

* Add New Passwords
* View Stored Passwords
* Update Existing Passwords
* Delete Passwords
* Password Generator
* Password Strength Checker
* Show/Hide Password
* Copy Password to Clipboard

### 📂 Organization

* Categories Support
* Custom Categories
* Favorites System
* Search Passwords
* Filter by Category
* Advanced Sorting

### 📊 Dashboard

* Total Password Count
* Strong vs Weak Password Statistics
* Recently Added Passwords
* Security Overview

### 🔒 Security Features

* Encrypted Password Storage
* Password Reuse Detection
* Password Age Tracking
* Expiry Notifications
* Security Health Reports

### 📝 Extra Features

* Activity Logs
* Password History Tracking
* Trash Bin & Restore Functionality
* Export Passwords
* Import Passwords
* Dark Mode

---

## 🏗️ Tech Stack

### Frontend

* HTML5
* CSS3
* EJS

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Security

* bcrypt
* Express Sessions
* Encryption Utilities

---

## 📁 Project Structure

```text
VaultX/
│
├── database/
│   └── schema.sql
│
├── controllers/
├── middleware/
├── public/
├── routes/
├── views/
│
├── server.js
├── db.js
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/VaultX---Secure-Password-Management-System.git
cd VaultX---Secure-Password-Management-System
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=vaultx
PORT=3000
```

### Run Database Schema

Execute the queries inside:

```text
database/schema.sql
```

### Start Server

```bash
npm run dev
```

---

## 🎯 Learning Objectives

This project focuses on:

* Express.js Routing
* Middleware
* MySQL Integration
* CRUD Operations
* Authentication & Authorization
* Database Relationships
* Security Best Practices
* MVC Architecture
* Real-World Backend Development

---

## 🌟 Future Enhancements

* Two-Factor Authentication (2FA)
* Email Verification
* Password Reset via Email
* REST API Version
* React Frontend Integration
* Cloud Deployment
* Admin Dashboard
* Security Audit Reports

---

## 👨‍💻 Developer

Built with passion by **Dipak Gupta** as part of the journey toward becoming a Full-Stack Developer.

⭐ If you find this project useful, consider giving it a star!
