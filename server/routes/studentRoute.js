import express from 'express';
import Student from '../models/studentModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user information to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

// POST request to create a student
router.post('/createStudents', isAuthenticated, (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(400).json("Data not found");
  }

  Student.create({ 
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    dob: data.dob,
    experience: data.experience,
    skill: data.skill,
    college: data.college,
    education: data.education,
    github: data.github,
    linkedin: data.linkedin,
    youtube: data.youtube,
    projects: data.projects,
    image: data.image,
  })
    .then((student) => res.status(201).json(student))
    .catch((error) => res.status(400).json({ error: error.message }));
});

// GET request to fetch all students
router.get('/getStudents', isAuthenticated, (req, res) => {
  const userEmail = req.user.email; // Use the email from the decoded JWT token
  
  if (!userEmail) {
    return res.status(401).json({ error: "User is not authenticated" });
  }
  
  Student.findOne({ email: userEmail }) 
    .then((student) => {
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      
      Student.find({ email: userEmail })
        .then((students) => res.status(200).json(students))
        .catch((error) => res.status(400).json({ error: error.message }));
    })
    .catch((error) => res.status(400).json({ error: error.message }));
});

// GET request to fetch a student by ID
router.get('/resume/:id', isAuthenticated, async (req, res) => {
  const studentId = req.params.id;
  if (!studentId) {
    return res.status(400).json({ message: 'Student ID not found' });
  }
  console.log("id", studentId);
  Student.findById(studentId)
    .then((student) => {
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json(student);
    })
    .catch((error) => res.status(400).json({ error: error.message }));
});

// GET request to fetch the authenticated user's email
router.get('/getUserEmail', isAuthenticated, (req, res) => {
  const userEmail = req.user.email; // Use the email from the decoded JWT token
  
  if (userEmail) {
    res.status(200).json({ email: userEmail });
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

export default router;  