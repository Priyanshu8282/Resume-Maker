import React, { useEffect, useState } from 'react'
import "./RegisterPage.css"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import { useNavigate } from 'react-router-dom';


function RegisterPage() {
  const [userData, setUserData] = useState({ email: '', password: '', name: '' });
  const navigate=useNavigate();

  

  
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://resume-maker-lw6e.onrender.com/auth/register', userData);
      toast.success('Data saved successfully!');
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'User already exists') {
        toast.error('Email is already registered. Please use a different email.');
      } else {
        console.error('Error saving data:', error);
        toast.error('An error occurred while saving data. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
 
  return (
    <div className="center-container">
      <ToastContainer/>
      <div className='signin-container'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Name: <input type="text" name='name' placeholder="Enter your name" onChange={handleChange} required /></label>
          <label htmlFor='email'>Email: <input type="text" name='email' placeholder="Enter your email" onChange={handleChange} required /></label>
          <label htmlFor='password'>Password: <input type="password" name='password' placeholder="Enter your password" onChange={handleChange} required /></label>
          <button type='submit'>Register</button>
         
          <p>Already have an account? <a href="/">Log in now</a></p>

        {/* <button type='button' onClick={handleGoogleLogin} className="google-login-button">
         <FcGoogle className="google-icon"/>  Register with Google
          </button> */}
        </form>
      </div>
     
    </div>
  );
}
export default RegisterPage
