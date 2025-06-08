import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { AuthContext } from "../Auth/AuthContext";
import { toast } from 'react-toastify';

const Navbar = () => {
  const { isLogged, setIsLogged } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check auth status using localStorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    setIsLogged(!!(token && user));
  }, []);

  const handleLogout = () => {
    // Clear all auth related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogged(false);
    toast.success("Logged out successfully!");
    navigate("/");
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