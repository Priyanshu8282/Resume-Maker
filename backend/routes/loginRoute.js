import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('password:', password);
    const existingUser = await User.findOne({ email });
    
    if (!existingUser) {
      console.log('User not found');
      return res.status(404).json({ message: 'User doesn\'t exist' });
    }

   

    // Compare the entered password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);



    if (!isPasswordCorrect) {
      console.log('Invalid password');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    req.session.userId = existingUser._id;
    req.session.userEmail = existingUser.email;
    console.log('Login successful');
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});


export default router;
