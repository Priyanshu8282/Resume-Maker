import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentInfo.css";

function StudentInfo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    experience: "",
    skill: "",
    college: "",
    education: "",
    github: "",
    linkedin: "",
    projects: [{ title: "", description: "" }],
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("studentPortfolio"));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const projects = [...formData.projects];
    projects[index][name] = value;
    setFormData({ ...formData, projects });
  };

  const addProject = () => {
    setFormData((prevState) => ({
      ...prevState,
      projects: [...prevState.projects, { title: "", description: "" }],
    }));
  };

  const removeProject = (index) => {
    const projects = [...formData.projects];
    projects.splice(index, 1);
    setFormData({ ...formData, projects });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("studentPortfolio", JSON.stringify(formData));
    navigate("/output");
  };
  const handleClear = () => {
    localStorage.removeItem("studentPortfolio");
    setFormData({
      name: "",
      email: "",
      dob: "",
      experience: "",
      skill: "",
      college: "",
      education: "",
      github: "",
      linkedin: "",
      projects: [{ title: "", description: "" }],
    });
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
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-education">
          <label htmlFor="education">Education:</label>
          <input
            type="text"
            id="education"
            placeholder="Enter your educational background"
            value={formData.education}
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
            onChange={handleChange}
          />
        </div>

        <div className="input-experience">
          <label htmlFor="experience">Experience (years):</label>
          <input
            type="number"
            id="experience"
            min={0}
            max={50}
            value={formData.experience}
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
            onChange={handleChange}
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
              <button type="button" onClick={addProject}>
                Add Another Project
              </button>
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
