import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { AuthContext } from "../Auth/AuthContext";
import { toast } from 'react-toastify';

const Navbar = () => {
  const { isLogged, setIsLogged } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark";
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check auth status using localStorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    setIsLogged(!!(token && user));
    // Set initial theme
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
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
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
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
