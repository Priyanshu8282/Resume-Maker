import React from "react";
import { useNavigate } from "react-router-dom";
import "./Output.css";

function Output() {
  const studentData = JSON.parse(localStorage.getItem("studentPortfolio"));
  const navigate = useNavigate();

  return (
    <div className="portfolio-container">
      <h1>Portfolio</h1>
      <div className="portfolio-content">
        <div className="section">
          <h2>Contact Information</h2>
          <p>
            <strong>Name:</strong> {studentData.name}
          </p>
          <p>
            <strong>Email:</strong> {studentData.email}
          </p>
          <p>
            <strong>Date of Birth:</strong> {studentData.dob}
          </p>
        </div>

        <div className="section">
          <h2>Professional Experience</h2>
          <p>
            <strong>Experience:</strong> {studentData.experience} years
          </p>
          <p>
            <strong>Skills:</strong> {studentData.skill}
          </p>
        </div>

        <div className="section">
          <h2>Education</h2>
          <p>
            <strong>Education:</strong> {studentData.education}
          </p>
          <p>
            <strong>College:</strong> {studentData.college}
          </p>
        </div>

        <div className="section">
          <h2>Social Profiles</h2>
          <p>
            <strong>GitHub:</strong>{" "}
            <a
              href={studentData.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              {studentData.github}
            </a>
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a
              href={studentData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {studentData.linkedin}
            </a>
          </p>
        </div>

        <div className="section">
          <h2>Projects</h2>
          {studentData.projects.map((project, index) => (
            <div key={index} className="project-entry">
              <p>
                <strong>Project Title:</strong> {project.title}
              </p>
              <p>
                <strong>Description:</strong> {project.description}
              </p>
            </div>
          ))}
        </div>

        <button className="back-button" onClick={() => navigate("/")}>
          Back to Form
        </button>
      </div>
    </div>
  );
}

export default Output;
