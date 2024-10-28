import React, { useState, useContext } from 'react';
import axios from 'axios';
import "./LoginPage.css"
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../Auth/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://resume-maker-b545.onrender.com/auth/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        toast.success('Login successful!');
        setIsLogged(true); // Update auth state
        navigate('/resume'); // Redirect to a protected route
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="center-container">
      <ToastContainer />
      <div className='login-container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email: 
            <input 
              type="text" 
              name='email' 
              placeholder="Enter your email" 
              value={email}
              onChange={handleEmailChange} 
              required 
            />
          </label>
          <label htmlFor='password'>Password: 
            <input 
              type="password" 
              name='password' 
              placeholder="Enter your password" 
              value={password}
              onChange={handlePasswordChange} 
              required 
            />
          </label>  
          <button type='submit'>Login</button>
          <p>Don't have an account? <a href="/register">Sign Up</a></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
