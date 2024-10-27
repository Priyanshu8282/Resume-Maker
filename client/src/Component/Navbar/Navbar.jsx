import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { AuthContext } from "../Auth/AuthContext";
import { toast } from 'react-toastify';

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
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLogged(false);
        return;
      }

      const response = await axios.get("http://localhost:5000/auth/checkAuth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log("response:", response.data.isLoggedIn);
      setIsLogged(response.data.isLoggedIn);
    } catch (error) {
      console.error("Error checking authentication status:", error);
      setIsLogged(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please log in.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Clear token from local storage and update auth context
        localStorage.removeItem("token");
        setIsLogged(false);

        // Redirect to home or login page
        navigate("/");

        toast.success("Logout successful!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
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