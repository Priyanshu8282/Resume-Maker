import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

router.get('/checkAuth', (req, res) => {
    console.log("res", req.session.userId);
  if (req.session.userId || req.session.userEmail) {
    return res.json({ isLoggedIn: true });
    
  } else {
    res.json({ isLoggedIn: false });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // clear the session cookie
    req.session = null; // Ensures the session is null after destroying it
    res.status(200).json({ message: 'Logout successful' });
  });
});

export default router;