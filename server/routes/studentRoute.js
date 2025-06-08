import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  createStudent,
  getStudents,
  getStudentById,
  getUserEmail,
} from '../controller/studentController.js';

dotenv.config();
const router = express.Router();



// Routes
router.post('/createStudents',  createStudent);
router.get('/getStudents/:email', getStudents);
router.get('/resume/:id',  getStudentById);
router.get('/getUserEmail',  getUserEmail);

export default router;