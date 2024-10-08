import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import axios from "axios";

import { useNavigate, useLocation } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { AuthContext } from "../Auth/AuthContext";

const Navbar = () => {
  const { isLogged, setIsLogged } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current route
  axios.defaults.withCredentials = true;

  useEffect(() => {
    checkAuthStatus();
  }, []); // Run only once when the component mounts

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("https://resume-maker-b545.onrender.com/auth/checkAuth", {
        withCredentials: true,
      });
      console.log("response:", response.data.isLoggedIn);
      setIsLogged(response.data.isLoggedIn);
    } catch (error) {
      console.error("Error checking authentication status:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        { withCredentials: true }
      );
     
      setIsLogged(false);
      navigate("/"); // Redirect to home or login page
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  const handlePageToggle = () => {
    if (location.pathname === "/") {
      navigate("/register");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="navbar">
    
      <div className="logo">
        <img
          src="https://resumebuild.com/app/account/static/images/logos/resumebuild-logo.svg"
          alt="Logo"
        />
      </div>
      <div className="sidebar-btn">
        <div className="theme-toggle btn" onClick={toggleTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </div>
        {isLogged ? (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        ) : (
          <button onClick={handlePageToggle} className="login-register-toggle">
            {location.pathname === "/" ? "Register" : "Login"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
