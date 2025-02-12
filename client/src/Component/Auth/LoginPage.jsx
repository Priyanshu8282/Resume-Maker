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
  const [loading, setLoading] = useState(false);
  const { setIsLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts
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
      if (error.response && error.response.status === 400 && error.response.data.message === 'User already exists') {
        toast.error('Email is already registered. Please use a different email.');
      } else if (error.response.status === 401 && error.response.data.message === 'Incorrect password') {
          toast.error('Incorrect password. Please try again.');
        }
      else {
        console.error('Error saving data:', error);
        toast.error('An error occurred while saving data. Please try again.');
      }
    } finally {
      setLoading(false); // Set loading to false when the request completes
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
 const handleNavigateToRegister = () => {
    navigate('/register');
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
         <p>Don't have an account? <a onClick={handleNavigateToRegister}>Sign Up</a></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
