import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentInfo.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Global base URL
const BASE_URL = "https://resume-maker-b545.onrender.com";

function StudentInfo({ studentData, setStudentData }) {
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
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // Get user email from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.email) {
      setLoggedInEmail(userData.email);
      // Set the email in formData
      setFormData(prev => ({ ...prev, email: userData.email }));
      setStudentData(prev => ({ ...prev, email: userData.email }));
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("user"));
      
      console.log("Auth Data:", {
        token: token ? "Token exists" : "No token",
        email: userData?.email || "No email"
      });

      if (!token || !userData?.email) {
        toast.error("Please login to access this page");
        return;
      }

      const apiUrl = `${BASE_URL}/api/getStudents/${userData.email}`;
      console.log("Fetching from URL:", apiUrl);

      const res = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log("API Response:", {
        status: res.status,
        data: res.data
      });

      if (res.data) {
        console.log("Setting form data with:", res.data);
        setFormData(res.data);
        setStudentData(res.data);
      } else {
        console.log("No data found, initializing with user email");
        const initialData = {
          ...formData,
          email: userData.email,
        };
        setFormData(initialData);
        setStudentData(initialData);
      }
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      
      if (error.response) {
        toast.error(error.response.data.message || "Failed to fetch student data");
      } else {
        toast.error("Failed to fetch student data. Please try again.");
      }
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
      setImageFile(file);
      // Optionally, update preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
        setStudentData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!token || !userData?.email) {
        toast.error("Please login to save data");
        return;
      }
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'projects') {
          form.append(key, JSON.stringify(value));
        } else if (key !== 'image') {
          form.append(key, value);
        }
      });
      if (imageFile) {
        form.append('image', imageFile);
      }
      const response = await axios.post(
        `${BASE_URL}/api/createOrUpdateStudent`,
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        toast.success("Student information saved successfully!");
        fetchData();
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Failed to save student information");
      } else {
        toast.error("Failed to save student information. Please try again.");
      }
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
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <div className="input-name">
          <label htmlFor="name">Name:<span style={{color: 'red'}}>*</span></label>
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
          <label htmlFor="email">Email:<span style={{color: 'red'}}>*</span></label>
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
          <label htmlFor="dob">DOB:<span style={{color: 'red'}}>*</span></label>
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
          <label htmlFor="mobile">Mobile Number:<span style={{color: 'red'}}>*</span></label>
          <input
            type="tel"
            id="mobile"
            placeholder="Enter mobile number"
            value={formData.mobile}
            name="mobile"
            onChange={handleChange}
            required
            maxLength={10}
            minLength={10}
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
          <label htmlFor="experience">Experience (years):<span style={{color: 'red'}}>*</span></label>
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
          <label htmlFor="skill">Skill:<span style={{color: 'red'}}>*</span></label>
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
          <label htmlFor="linkedin">LinkedIn URL:<span style={{color: 'red'}}>*</span></label>
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
          <label htmlFor="youtube">Youtube URL:<span style={{color: 'red'}}>*</span></label>
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
          <label htmlFor="image">Upload Image:<span style={{color: 'red'}}>*</span></label>
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
              <label htmlFor={`project-title-${index}`}>Project Title:<span style={{color: 'red'}}>*</span></label>
              <input
                type="text"
                name="title"
                id={`project-title-${index}`}
                placeholder="Enter project title"
                value={project.title}
                onChange={(e) => handleProjectChange(index, e)}
                required
              />
              <label htmlFor={`project-description-${index}`}>Description:<span style={{color: 'red'}}>*</span></label>
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
