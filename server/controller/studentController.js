import Student from '../models/studentModel.js';
import fs from 'fs';
import path from 'path';

// Helper to get only the file name from a path or URL
function getImagePath(image) {
  if (!image) return '';
  const fileName = image.split(/[\\/]/).pop();
  return `/userImages/${fileName}`;
}

// Create a new student
export const createStudent = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ message: "Data not found" });
  }
  try {
    const student = await Student.create({
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
      image: getImagePath(data.image),
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all students for authenticated user
export const getStudents = async (req, res) => {
 const email = req.params.email;
 console.log(email);
  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a student by ID
export const getStudentById = async (req, res) => {
  const studentId = req.params.id;
  if (!studentId) {
    return res.status(400).json({ message: 'Student ID not found' });
  }
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get authenticated user's email
export const getUserEmail = (req, res) => {
  const userEmail = req.user.email;
  if (userEmail) {
    res.status(200).json({ email: userEmail });
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
};

// Create or update a student by email
export const createOrUpdateStudent = async (req, res) => {
  const data = req.body;
  if (typeof data.projects === 'string') {
    try {
      data.projects = JSON.parse(data.projects);
    } catch (e) {
      data.projects = [];
    }
  }
  if (!data || !data.email) {
    return res.status(400).json({ message: "Data or email not found" });
  }
  try {
    let student = await Student.findOne({ email: data.email });
    let newImagePath = student ? student.image : '';
    if (req.file) {
      // If updating and a new image is uploaded, delete the old image file before saving the new one
      if (student && student.image) {
        const oldImagePath = path.join(process.cwd(), 'server', 'public', student.image);
        fs.access(oldImagePath, fs.constants.F_OK, (err) => {
          if (!err) {
            fs.unlink(oldImagePath, (err) => {
              // Optionally log error or success
            });
          }
        });
      }
      newImagePath = `/userImages/${req.file.filename}`;
    }
    if (student) {
      // Update existing student
      student = await Student.findOneAndUpdate(
        { email: data.email },
        {
          name: data.name,
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
          image: newImagePath,
        },
        { new: true }
      );
      return res.status(200).json(student);
    } else {
      // Create new student
      student = await Student.create({
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
        image: newImagePath,
      });
      return res.status(201).json(student);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
