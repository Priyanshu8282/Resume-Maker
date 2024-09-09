import React, { useContext, useState } from 'react';
import axios from 'axios';
import "./LoginPage.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';



function LoginPage() {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const { isLogged, setIsLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/checkAuth', { withCredentials: true });
      console.log('response:', response.data);
      setIsLogged(response.data.isLoggedIn);
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login request data:', userData);
    try {
      const response = await axios.post('http://localhost:5000/auth/login', userData,{withCredentials:true});
      console.log(response.data);
      
      toast.success('Login successful!');
      navigate('/resume'); 
      checkAuthStatus();// Redirect to a protected route
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error('User doesn\'t exist. Please check your email.');
        } else if (error.response.status === 400) {
          toast.error('Invalid credentials. Please check your password.');
        } else {
          toast.error('An error occurred while logging in. Please try again.');
        }
      } else {
        console.error('Error logging in:', error);
        toast.error('An error occurred while logging in. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
 
  return (
    <div className="center-container">
      <ToastContainer />
      <div className='login-container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email: <input type="text" name='email' placeholder="Enter your email" onChange={handleChange} required /></label>
          <label htmlFor='password'>Password: <input type="password" name='password' placeholder="Enter your password" onChange={handleChange} required /></label>
          <button type='submit'>Login</button>
        
          <p>Don't have an account? <a href="/register">Sign Up</a></p>
        </form>
       
      </div>
     
    </div>
  );
}

export default LoginPage;
