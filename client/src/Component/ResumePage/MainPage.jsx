import React, { useState } from "react";
import StudentInfo from "./StudentInfo";
import Output from "./OutputPage";
import "./MainPage.css";

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
    id: "",
  });
  return (
    <div className="main-container">
      <div className="student-info-container">
        <StudentInfo studentData={studentData} setStudentData={setStudentData} />
      </div>
      <div className="output-container1">
        <Output studentData={studentData} setStudentData={setStudentData} />
      </div>
    </div>
  );
}

export default MainPage;