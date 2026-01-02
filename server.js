import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './api/_db.js';

// Import handlers
import registerHandler from './api/auth/register.js';
import loginHandler from './api/auth/login.js';
import hisabIndexHandler from './api/hisab/index.js';
import hisabAddHandler from './api/hisab/add.js';
import udharIndexHandler from './api/udhar/index.js';
import udharIdHandler from './api/udhar/[id].js';
import udharAddPersonHandler from './api/udhar/add-person.js';
import udharAddEntryHandler from './api/udhar/add-entry.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Wrapper to adapt Vercel handlers to Express
const adaptHandler = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

// Auth routes
app.post('/api/auth/register', adaptHandler(registerHandler));
app.post('/api/auth/login', adaptHandler(loginHandler));

// Hisab routes
app.get('/api/hisab', adaptHandler(hisabIndexHandler));
app.post('/api/hisab/add', adaptHandler(hisabAddHandler));

// Udhar routes
app.get('/api/udhar', adaptHandler(udharIndexHandler));
app.get('/api/udhar/:id', adaptHandler(udharIdHandler));
app.post('/api/udhar/add-person', adaptHandler(udharAddPersonHandler));
app.post('/api/udhar/add-entry', adaptHandler(udharAddEntryHandler));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
