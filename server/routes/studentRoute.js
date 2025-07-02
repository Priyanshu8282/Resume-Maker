import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  createStudent,
  getStudents,
  getStudentById,
  getUserEmail,
  createOrUpdateStudent,
} from '../controller/studentController.js';
import upload from '../middleware/multer.js';

dotenv.config();
const router = express.Router();



// Routes
router.post('/createStudents',  createStudent);
router.post('/createOrUpdateStudent', upload.single('image'), createOrUpdateStudent);
router.get('/getStudents/:email', getStudents);
router.get('/resume/:id',  getStudentById);
router.get('/getUserEmail',  getUserEmail);

export default router;
