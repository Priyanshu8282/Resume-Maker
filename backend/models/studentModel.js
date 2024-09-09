import mongoose from 'mongoose';


const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  dob: String,
  experience: String,
  skill: String,
  college: String,
  education: String,
  github: String,
  linkedin: String,
  youtube: String,
  projects: [{
    title: String,
    description: String,
  }],
  image: String,
});


const Student = mongoose.model('Student', StudentSchema);
export default Student;