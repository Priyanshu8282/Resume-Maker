import bcrypt from 'bcryptjs';
import session from 'express-session';
import express from 'express';
import User from '../models/userModel.js';
const router = express.Router();



//register route
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const result = await User.create({ email, password: password, name });

    req.session.userId = result._id;
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

export default router;
