import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword
} from '../controller/usercontroller.js'; // Adjust path if needed

const router = express.Router();

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Logout
router.post('/logout', logoutUser);

// Forgot Password
router.post('/forgot-password', forgotPassword);

// Reset Password

router.post('/reset-password/:token', resetPassword);

export default router;
