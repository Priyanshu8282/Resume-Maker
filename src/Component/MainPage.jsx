import React from "react";
import StudentInfo from "./StudentInfo";
import Output from "./OutputPage";
import "./MainPage.css";
import { useState } from "react";

function MainPage() {
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
  });

  return (
    <div className="main-container">
      <div className="student-info-container">
        <StudentInfo studentData={studentData} setStudentData={setStudentData} />
      </div>
      <div className="output-container">
        <Output studentData={studentData} />
      </div>
    </div>
  );
}

export default MainPage;
