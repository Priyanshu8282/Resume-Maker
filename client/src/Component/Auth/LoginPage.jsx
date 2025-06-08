import React, { useState, useContext } from 'react';
import axios from 'axios';
import "./LoginPage.css"
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../Auth/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'https://resume-maker-b545.onrender.com';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setIsLogged(true);
        toast.success(response.data.message, {
          onClose: () => navigate('/resume')
        });
      } else {
        toast.error('Login failed');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Login failed');
      } else {
        console.error('Error saving data:', error);
        toast.error('An error occurred while saving data. Please try again.');
      }
    } finally {
      setLoading(false);
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
          <button type='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p>Don't have an account? <a href="/register">Sign Up</a></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
