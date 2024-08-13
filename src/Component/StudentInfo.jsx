import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentInfo.css";

function StudentInfo({ studentData, setStudentData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile:"",
    dob: "",
    experience: "",
    skill: "",
    college: "",
    education: "",
    github: "",
    linkedin: "",
    youtube: "",
    projects: [{ title: "", description: "" }],
    image: null,
  });
  const [mobileNumber, setMobileNumber] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("studentPortfolio"));
    if (savedData) {
      setFormData(savedData);
      setStudentData(savedData);
    }
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          image: reader.result, // Base64 string
        }));
        setStudentData((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const projects = [...formData.projects];
    projects[index][name] = value;
    setFormData((prevData) => ({ ...prevData, projects }));
    setStudentData((prevData) => ({ ...prevData, projects }));
  };

  const addProject = () => {
    setFormData((prevData) => ({
      ...prevData,
      projects: [...prevData.projects, { title: "", description: "" }],
    }));
    setStudentData((prevData) => ({
      ...prevData,
      projects: [...prevData.projects, { title: "", description: "" }],
    }));
  };

  const removeProject = (index) => {
    const projects = [...formData.projects];
    projects.splice(index, 1);
    setFormData((prevData) => ({ ...prevData, projects }));
    setStudentData((prevData) => ({ ...prevData, projects }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("studentPortfolio", JSON.stringify(formData));
    navigate("/");
  };

  const handleClear = () => {
    localStorage.removeItem("studentPortfolio");
    setFormData({
      name: "",
      email: "",
      mobile:"",
      dob: "",
      experience: "",
      skill: "",
      college: "",
      education: "",
      github: "",
      linkedin: "",
      youtube: "",
      projects: [{ title: "", description: "" }],
      image: null,
    });
    setStudentData({
      name: "",
      email: "",
      mobile:"",
      dob: "",
      experience: "",
      skill: "",
      college: "",
      education: "",
      github: "",
      linkedin: "",
      youtube: "",
      projects: [{ title: "", description: "" }],
      image: null,
    });
  
      

  };

  const generateWhatsAppLink = () => {
    return `https://wa.me/${mobileNumber}`;
  };

  return (
    <div className="container">
      <h1>Student Portfolio</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-name">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            name="name"
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>
        <div className="input-email">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>
        <div className="input-dob">
          <label htmlFor="dob">DOB:</label>
          <input
            type="date"
            id="dob"
            value={formData.dob}
            name="dob"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-mobile">
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="tel"
            id="mobile"
            placeholder="Enter mobile number"
            value={formData.mobile}
            name="mobile"
            onChange={handleChange} // Update mobile number state
            required
          />
        </div>

        <div className="input-education">
          <label htmlFor="education">Education:</label>
          <input
            type="text"
            id="education"
            placeholder="Enter your education"
            value={formData.education}
            name="education"
            onChange={handleChange}
          />
        </div>

        <div className="input-college">
          <label htmlFor="college">College Name:</label>
          <input
            type="text"
            id="college"
            placeholder="Enter your college name"
            value={formData.college}
            name="college"
            onChange={handleChange}
          />
        </div>

        <div className="input-experience">
          <label htmlFor="experience">Experience (years):</label>
          <input
            type="number"
            id="experience"
            min={0}
            max={5}
            value={formData.experience}
            name="experience"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-skill">
          <label htmlFor="skill">Skill:</label>
          <textarea
            id="skill"
            placeholder="Enter your skills"
            value={formData.skill}
            name="skill"
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="input-github">
          <label htmlFor="github">GitHub URL:</label>
          <input
            type="url"
            id="github"
            placeholder="Enter your GitHub profile URL"
            value={formData.github}
            name="github"
            onChange={handleChange}
          />
        </div>
        <div className="input-linkedin">
          <label htmlFor="linkedin">LinkedIn URL:</label>
          <input
            type="url"
            id="linkedin"
            placeholder="Enter your LinkedIn profile URL"
            value={formData.linkedin}
            name="linkedin"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-youtube">
          <label htmlFor="youtube">Youtube URL:</label>
          <input
            type="url"
            id="youtube"
            placeholder="Enter your youtube profile link"
            value={formData.youtube}
            name="youtube"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-image">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="input-projects">
          <h2>Projects</h2>
          {formData.projects.map((project, index) => (
            <div key={index} className="project-entry">
              <label htmlFor={`project-title-${index}`}>Project Title:</label>
              <input
                type="text"
                name="title"
                id={`project-title-${index}`}
                placeholder="Enter project title"
                value={project.title}
                onChange={(e) => handleProjectChange(index, e)}
                required
              />
              <label htmlFor={`project-description-${index}`}>
                Description:
              </label>
              <textarea
                name="description"
                id={`project-description-${index}`}
                placeholder="Enter project description"
                value={project.description}
                onChange={(e) => handleProjectChange(index, e)}
                required
              ></textarea>
              {formData.projects.length > 1 && (
                <span
                  className="remove-project"
                  onClick={() => removeProject(index)}
                >
                  &#10005;
                </span>
              )}
              {index === formData.projects.length - 1 && (
                <button type="button" onClick={addProject}>
                  Add Another Project
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="submit">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleClear} className="clear-button">
            Clear
          </button>
          
        </div>
      </form>
    </div>
  );
}

export default StudentInfo;
