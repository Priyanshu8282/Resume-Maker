import Student from '../models/studentModel.js';

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
      image: data.image,
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