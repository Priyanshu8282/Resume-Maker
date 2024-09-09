import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentInfo.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { set } from "mongoose";

function StudentInfo({ studentData, setStudentData}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    experience: "",
    skill: "",
    college: "",
    education: "",
    github: "",
    linkedin: "",
    youtube: "",
    projects: [{ title: "", description: "" }],
    image: "",
    id: "",
  });
  const [showJSON, setShowJSON] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState("");
 

  useEffect(() => {
    fetchUserEmail();
    fetchData();
  }, []);
  const fetchUserEmail = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/getUserEmail", {
        withCredentials: true,
      });
      setLoggedInEmail(res.data.email);
      console.log("User email:", res.data.email);
    
      
    
      
    } catch (error) {
      console.error("Error fetching user email:", error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/getStudents", {
        withCredentials: true,
      });

      const fetchedData = res.data;
      

      console.log(fetchedData[fetchedData.length - 1]);
      setFormData(fetchedData[fetchedData.length - 1]);
      setStudentData(fetchedData[fetchedData.length - 1]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
    setStudentData(updatedFormData);
  };

  const handleJSONToggle = () => {
    setShowJSON(!showJSON);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedFormData = {
          ...formData,
          image: reader.result, // Base64 string
        };
        setFormData(updatedFormData);
        setStudentData(updatedFormData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure formData is correctly formatted
    console.log("Form Data:", formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/createStudents",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      toast.success("Student information saved successfully!");
    } catch (error) {
      console.error("Error response:", error.response);
      toast.error("Failed to save student information.");
    }
  };
  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = formData.projects.map((project, i) =>
      i === index ? { ...project, [name]: value } : project
    );
    setFormData({ ...formData, projects: updatedProjects });
    setStudentData({ ...formData, projects: updatedProjects });
  };

  const addProject = () => {
    const updatedFormData = {
      ...formData,
      projects: [...formData.projects, { title: "", description: "" }],
    };
    setFormData(updatedFormData);
    setStudentData(updatedFormData);
  };

  const removeProject = (index) => {
    const projects = [...formData.projects];
    projects.splice(index, 1);
    const updatedFormData = { ...formData, projects };
    setFormData(updatedFormData);
    setStudentData(updatedFormData);
  };


  const handleClear = () => {
    const initialFormData = {
      name: "",
      email: "",
      mobile: "",
      dob: "",
      experience: "",
      skill: "",
      college: "",
      education: "",
      github: "",
      linkedin: "",
      youtube: "",
      projects: [{ title: "", description: "" }],
      image: "",
    };
    setFormData(initialFormData);
    setStudentData(initialFormData);
  };

  return (
    <div className="container">
      <ToastContainer />

      <h1>Student Portfolio</h1>
      <form onSubmit={handleSubmit} method="post" enctype="multipart/form-data">
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
            onChange={handleChange}
            required
            max={10}
            min={10}
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
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>
        <div className="input-projects">
          <h2>Projects</h2>
          {formData.projects?.map((project, index) => (
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
          <button type="submit">Save</button>
          <button type="button" onClick={handleClear} className="clear-button">
            Clear
          </button>
        </div>
      </form>
      <button
        type="button"
        onClick={handleJSONToggle}
        className="fetch-json-button"
      >
        JSON
      </button>

      {/* Conditionally Render JSON Data */}

      {showJSON && (
        <div className="modal">
          <button className="close" onClick={handleJSONToggle}>
            &times;
          </button>
          <pre className="modal-content">
            {JSON.stringify(formData, null, 1)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default StudentInfo;
