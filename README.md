# PRODIGY_FS_01
# 📚 Book Review Platform  
**Task-01 — Secure User Authentication**  
**Prodigy Infotech | Full Stack Web Development Internship**

---

## 📌 Project Overview  

This project is developed as **Task-01** of my **Full Stack Web Development Internship at Prodigy Infotech**.  
The objective of this task is to implement a **secure user authentication system** and integrate it into a real-world full-stack web application.

The application is a **Book Review Platform** built using the **MERN Stack (MongoDB, Express, React, Node.js)** where users can:

- Register and log in securely  
- Add books  
- Post reviews  
- Give ratings  
- Access protected routes only after authentication  

---

## 🔐 Task-01 Requirement  

**“Implement a user authentication system with secure login and registration functionality. Users should be able to sign up, log in securely, and access protected routes only after successful authentication.”**

This project fulfills the requirement by using:

- JWT-based authentication  
- Password hashing  
- Role-based and protected routes  
- Secure session handling  

---

## 🚀 Features  

- 🔑 User Authentication  
  - Secure Signup & Login  
  - JWT Token-based authentication  
  - Password hashing using bcrypt  

- 📖 Book Management  
  - Add new books  
  - Edit existing books  
  - Delete books  

- ⭐ Reviews & Ratings  
  - Users can review and rate books  
  - Each user can review a book only once  
  - Average rating calculation  

- 👤 Profile Page  
  - View user’s added books  
  - View user’s reviews  

- 🔐 Protected Routes  
  - Only authenticated users can add books or post reviews  

- 🎨 Modern UI  
  - Responsive design  
  - Built with React and Tailwind CSS  

- ☁️ Cloud Database  
  - MongoDB Atlas for data storage  

---

## 🧩 Tech Stack  

| Layer       | Technology |
|------------|-----------|
| Frontend   | React.js, Tailwind CSS |
| Backend    | Node.js, Express.js |
| Database   | MongoDB Atlas |
| Security   | JWT, bcrypt |
| API Style  | RESTful APIs |

---


## 📦 Installation & Setup

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```
MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secret-key
PORT=5000
```

Start backend:
```bash
npm run dev
```

### Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

---

## 🔑 Authentication Flow  

1. User registers → password is hashed → user stored in MongoDB  
2. User logs in → JWT token is generated  
3. Token is stored in browser (localStorage)  
4. Token is sent with each protected API request  
5. Middleware verifies token before allowing access  

---

## 📷 Screenshots  

- Home Page  
- Profile Page  
- Book Details with Reviews  

(Add screenshots here)

---

## 🎯 Internship Details  

This project was developed as part of:

**Full Stack Web Development Internship**  
**Company: Prodigy Infotech**  
**Task: Task-01 – Secure User Authentication**

---

## 🤝 Contributing  

Pull requests are welcome.  
For major changes, please open an issue first.

---

## 📌 Author  

**Akash Jadhav**  
Full Stack Web Development Intern  
**Prodigy Infotech**






