import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// In-memory token blacklist (for demonstration purposes)
const tokenBlacklist = new Set();

// Route to check authentication status
router.get('/checkAuth', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.json({ isLoggedIn: false });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.json({ isLoggedIn: false });
    }

    if (tokenBlacklist.has(token)) {
      return res.json({ isLoggedIn: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          console.error('Token expired:', err);
          return res.json({ isLoggedIn: false, message: 'Token expired' });
        }
        console.error('Token verification error:', err);
        return res.json({ isLoggedIn: false, message: 'Token verification failed' });
      }

      res.json({ isLoggedIn: true });
    });
  } catch (error) {
    console.error('Error checking authentication status:', error);
    res.status(500).json({ message: 'Server error', success: false });
  }
});

// Route to handle logout
router.post('/logout', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization header provided', success: false });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided', success: false });
    }

    // Add the token to the blacklist
    tokenBlacklist.add(token);

    res.status(200).json({ message: 'Logout successful', success: true });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error', success: false });
  }
});

export default router;