
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import RegisterPage from "./Component/Auth/RegisterPage";
import LoginPage from "./Component/Auth/LoginPage";
import MainPage from "./Component/ResumePage/MainPage";
import ResumePage from "./Component/ResumePage/ResumePage";
import { useState } from "react";


function App() {
  return (
    
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/resume" element={<MainPage/>} />
        <Route path="/resume/:id" element={<ResumePage />} />

      </Routes>
    
    
  
    </Router>

    

  );
}

export default App;
