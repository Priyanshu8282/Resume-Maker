import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import "./Output.css";

function Output({ studentData }) {
  const portfolioRef = useRef();

  // Handle downloading PDF
  const handleDownloadPDF = () => {
    const element = portfolioRef.current;

    const options = {
      margin: 0.5,
      filename: `${studentData.name}_Portfolio.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <>
    <div className="portfolio-container" ref={portfolioRef}>
      <h1>Resume</h1>
      <div className="portfolio-content">
        {/* Personal Profile */}
        <div className="section">
          <h2>Personal Profile</h2>
          <div className="profile-image-container">
            <img
              src={studentData?.image}
              alt="Profile"
              className="profile-image"
            />
          </div>
          <p>
            <strong>Name:</strong> {studentData?.name}
          </p>
          <p>
            <strong>Email:</strong> {studentData?.email}
          </p>
          <p>
            <strong>Date of Birth:</strong> {studentData?.dob}
          </p>
        </div>

        {/* Professional Experience */}
        <div className="section">
          <h2>Professional Experience</h2>
          <p>
            <strong>Experience:</strong> {studentData?.experience} years
          </p>
          <p>
            <strong>Skills:</strong> {studentData?.skill}
          </p>
        </div>

        {/* Education */}
        <div className="section">
          <h2>Education</h2>
          <p>
            <strong>Education:</strong> {studentData?.education}
          </p>
          <p>
            <strong>College:</strong> {studentData?.college}
          </p>
        </div>

        {/* Social Profiles */}
        <div className="section">
          <h2>Social Profiles</h2>
          <p>
            <strong>GitHub:</strong>{" "}
            <a
              href={studentData?.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              {studentData?.github}
            </a>
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a
              href={studentData?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {studentData?.linkedin}
            </a>
          </p>
          <p>
            <strong>YouTube:</strong>{" "}
            <a
              href={studentData?.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              {studentData?.youtube}
            </a>
          </p>
        </div>

        {/* Projects */}
        <div className="section">
          <h2>Projects</h2>
          {studentData?.projects.map((project, index) => (
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

      </div>
    </div>
    <div className="btn-container">
        <button className="download-button" onClick={handleDownloadPDF}>
          Download
        </button>
        </div>
    </>
  );
}

export default Output;
