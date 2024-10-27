import express from 'express';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const createToken = (id) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  } catch (error) {
    console.error('Token creation error:', error); // Log the error
    return null;
  }
};


const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Validate request body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }

    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'User Already Exists', success: false });
    }

    // Validate email & strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid Email', success: false });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters', success: false });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
   

    // Create user
    const newUser = await userModel.create({ name, email, password: hashedPassword });

    // Create token
    const token = createToken(newUser._id);
    res.status(200).json({ message: 'User Registered Successfully', success: true, token, user: { name: newUser.name, email: newUser.email } });
  } catch (error) {
    console.error('Registration error:', error); // Log the error
    res.status(500).json({ message: 'Server Error', success: false });
  }
};
router.post('/register', registerUser);
export default router;