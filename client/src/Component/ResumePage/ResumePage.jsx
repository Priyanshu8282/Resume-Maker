import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import "./ResumePage.css";
import axios from "axios";

// Global base URL
const BASE_URL = "https://resume-maker-b545.onrender.com";

function ResumePage() {
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    dob: "",
    experience: "",
    skill: "",
    education: "",
    college: "",
    github: "",
    linkedin: "",
    projects: [],
    image: "",
    id: "",
  });
  const portfolioRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const { id } = useParams(); // Get the ID from the URL

  useEffect(() => {
    // Fetch the resume data when the component mounts
    fetchResumeData();
  }, []);

  const fetchResumeData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/resume/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      console.log("res", response.data);
      setStudentData(response?.data);
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  };

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

  // Handling hover events
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

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
                src={studentData?.image ? (studentData.image.startsWith('http') ? studentData.image : `${BASE_URL}${studentData.image}`) : ''}
                alt=""
                className="profile-image"
              />
            </div>
            <p className="pra">
              <strong>Name:</strong> {studentData?.name}
            </p>
            <p className="pra">
              <strong>Email:</strong>{" "}
              <a href={`mailto:${studentData?.email}`} title="email address">
                {studentData?.email}
              </a>
            </p>

            <p
              className="mobile-number"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <strong>Mobile no:</strong> {studentData?.mobile}
              {isHovered && (
                <div className="hover-options">
                  <a href={`tel:${studentData.mobile}`}>Call</a>
                  <a
                    href={`https://wa.me/${studentData.mobile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </div>
              )}
            </p>
            <p className="pra">
              <strong>Date of Birth:</strong> {studentData?.dob}
            </p>
          </div>

          {/* Professional Experience */}
          <div className="section">
            <h2>Professional Experience</h2>
            <p className="pra">
              <strong>Experience:</strong> {studentData?.experience} years
            </p>
            <p className="pra">
              <strong>Skills:</strong> {studentData?.skill}
            </p>
          </div>

          {/* Education */}
          <div className="section">
            <h2>Education</h2>
            <p className="pra">
              <strong>Education:</strong> {studentData?.education}
            </p>
            <p className="pra">
              <strong>College:</strong> {studentData?.college}
            </p>
          </div>

          {/* Social Profiles */}
          <div className="section">
            <h2>Social Profiles</h2>
            <p className="pra">
              <strong>GitHub:</strong>{" "}
              <a
                href={studentData?.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData?.github}
              </a>
            </p>
            <p className="pra">
              <strong>LinkedIn:</strong>{" "}
              <a
                href={studentData?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData?.linkedin}
              </a>
            </p>
            <p className="pra">
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
            {studentData?.projects && studentData?.projects.map((project, index) => (
              <div key={index} className="project-entry">
                <p className="pra">
                  <strong>Project Title:</strong> {project.title}
                </p>
                <p className="pra">
                  <strong>Description:</strong> {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="btn-container">
        <button
          className="download-button"
          onClick={handleDownloadPDF}
        >
          Download
        </button>
      </div>
    </>
  );
}

export default ResumePage;
