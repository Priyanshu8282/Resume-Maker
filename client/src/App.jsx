import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import RegisterPage from "./Component/Auth/RegisterPage";
import LoginPage from "./Component/Auth/LoginPage";
import MainPage from "./Component/ResumePage/MainPage";
import ResumePage from "./Component/ResumePage/ResumePage";
import { useState, useContext } from "react";
import { AuthContext } from "./Component/Auth/AuthContext";

function ProtectedRoute({ children }) {
  const { isLogged } = useContext(AuthContext);
  if (!isLogged) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function PublicRoute({ children }) {
  const { isLogged } = useContext(AuthContext);
  if (isLogged) {
    return <Navigate to="/resume" replace />;
  }
  return children;
}

function App() {
  return (
    
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/resume" element={<ProtectedRoute><MainPage/></ProtectedRoute>} />
        <Route path="/resume/:id" element={<ProtectedRoute><ResumePage /></ProtectedRoute>} />
      </Routes>
    
    
  
    </Router>

    

  );
}

export default App;
