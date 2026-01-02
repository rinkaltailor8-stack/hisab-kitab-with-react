# Hisab-Kitab 📒

A full-stack expense and loan tracking application built with React, Node.js, Express, and MongoDB.

## Features

- 👤 User Authentication (Register/Login)
- 💰 Hisab (Expense) Management
- 📝 Udhar (Loan) Tracking
- 🔒 Protected Routes
- 📱 Responsive Design with Tailwind CSS

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

## Project Structure

```
hisab-kitab/
├── api/                    # Backend API handlers
│   ├── auth/              # Authentication routes
│   ├── hisab/             # Expense routes
│   ├── udhar/             # Loan routes
│   ├── models/            # Mongoose models
│   └── utils/             # Utility functions
├── src/                   # Frontend application
│   └── src/
│       ├── components/    # React components
│       ├── pages/         # Page components
│       ├── context/       # React context
│       └── services/      # API services
├── server.js              # Express server
└── package.json           # Root dependencies
```

## Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hisab-kitab
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd src
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update the following variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/hisab-kitab
   # Or use MongoDB Atlas:
   # MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hisab-kitab
   
   JWT_SECRET=your-secret-key-change-this-in-production
   PORT=3000
   ```

## Running the Application

### Development Mode

You have two options to run the application:

**Option 1: Run both frontend and backend together**
```bash
npm run dev:all
```

**Option 2: Run frontend and backend separately**

In one terminal (Backend):
```bash
npm run server
```

In another terminal (Frontend):
```bash
npm run client
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Hisab (Expenses)
- `GET /api/hisab` - Get all expenses
- `POST /api/hisab/add` - Add new expense

### Udhar (Loans)
- `GET /api/udhar` - Get all loans
- `GET /api/udhar/:id` - Get specific loan details
- `POST /api/udhar/add-person` - Add new person
- `POST /api/udhar/add-entry` - Add loan entry

## Building for Production

1. **Build the frontend**
   ```bash
   cd src
   npm run build
   cd ..
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/hisab-kitab` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key` |
| `PORT` | Server port | `3000` |

## Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is running (if using local instance)
- Verify your MongoDB connection string is correct
- Check if your IP is whitelisted (for MongoDB Atlas)

### Port Already in Use
- Change the `PORT` in `.env` file
- Or kill the process using the port:
  ```bash
  lsof -ti:3000 | xargs kill -9
  ```

### Module Not Found Errors
- Make sure you've installed dependencies in both root and src directories
- Try deleting `node_modules` and `package-lock.json`, then reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  cd src
  rm -rf node_modules package-lock.json
  npm install
  ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC

## Author

Your Name

---

Made with ❤️ using React and Node.js
