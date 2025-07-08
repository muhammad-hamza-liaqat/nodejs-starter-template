# Node.js Starter Template

A boilerplate Node.js project using Express, Mongoose, EJS, and modern best practices. This template helps you quickly start building robust REST APIs with authentication, validation, and modular structure.

---

## 🚀 Features

- Express.js server
- MongoDB (Mongoose) integration
- EJS view engine
- Modular folder structure
- Request logging
- Centralized error and response handling
- User authentication (JWT-ready)
- Input validation (Yup)
- CORS configuration

---

## 🏗️ Folder Structure

```
nodejs_starter_template/
├── public/                  # Static assets (e.g., expressjs-icon.svg)
├── src/
│   ├── config/              # App configuration (CORS, DB connection)
│   ├── controllers/         # Route controllers (business logic)
│   ├── helpers/             # Helper utilities (e.g., bcrypt)
│   ├── middlewares/         # Express middlewares (auth, etc.)
│   ├── models/              # Mongoose models
│   ├── routes/              # Route definitions
│   │   ├── authorizedRoutes/    # (Reserved for protected routes)
│   │   └── unauthorizedRoutes/  # Public routes (e.g., auth)
│   ├── utils/               # Utilities (logger, handlers, validation)
│   └── views/               # EJS templates
├── package.json             # Project metadata and dependencies
├── vercel.json              # Vercel deployment config
└── ...
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/muhammad-hamza-liaqat/nodejs-starter-template
cd nodejs_starter_template
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file in the root directory with the following variables:

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/your-db-name
BCRYPT_SALT_ROUNDS=10
JWT_SECRET=your_jwt_secret
```

- `PORT`: (optional) Port for the server (default: 8080)
- `MONGO_URI`: MongoDB connection string
- `BCRYPT_SALT_ROUNDS`: Number of salt rounds for bcrypt password hashing
- `JWT_SECRET`: Secret key for JWT authentication
- `MORE`: Visit the `.env.dist` file, all the env variables are listed there copy and make the env file and save the values

### 4. Start the development server

```bash
npm run dev
```

Visit [http://localhost:8080](http://localhost:8080) to see the welcome page.

---

## 📦 Scripts

- `npm run dev` — Start server with nodemon (auto-reload)
- `npm start` — Start server normally

---

## 🛣️ API Example: User Signup

- **Endpoint:** `POST /api/auth/sign-up`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password@123"
  }
  ```
- **Validation:**
  - Name: required
  - Email: required, valid email
  - Password: required, min 6 chars, at least 1 letter, 1 number, 1 special character, no spaces
- **Response:**
  - Success: `{ success: true, status: 201, message: "User registered successfully", data: { user: { ... } } }`
  - Error: `{ success: false, status: 409, message: "User already exists" }`

---

## 📝 Author

- **Name:** Muhammad-Hamza-Liaqat
- **E-Mail:** mh408800@gmail.com

---

## 📄 License

This project is licensed under the ISC License.
