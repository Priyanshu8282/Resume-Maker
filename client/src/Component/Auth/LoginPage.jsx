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
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotHover, setForgotHover] = useState(false);
  const [signupHover, setSignupHover] = useState(false);

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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) return toast.error('Please enter your email.');
    setForgotLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/forgot-password`, { email: forgotEmail });
      toast.success(response.data.message || 'Password reset link sent!');
      setShowForgot(false);
      setForgotEmail("");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Failed to send reset link');
      } else {
        toast.error('Failed to send reset link. Please try again.');
      }
    } finally {
      setForgotLoading(false);
    }
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
          <p style={{ marginTop: '10px' }}>
            <a
              href="#"
              onClick={e => { e.preventDefault(); navigate('/forgot-password'); }}
              style={{ color: forgotHover ? '#218838' : '#28a745', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={() => setForgotHover(true)}
              onMouseLeave={() => setForgotHover(false)}
            >
              Forgot Password?
            </a>
          </p>
          {showForgot && (
            <div className="forgot-modal" style={{ background: '#fff', border: '1px solid #ccc', padding: 20, borderRadius: 8, marginTop: 10 }}>
              <h3>Forgot Password</h3>
              <form onSubmit={handleForgotPassword}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  required
                  style={{ padding: 8, width: '100%', marginBottom: 10 }}
                />
                <div style={{ display: 'flex', gap: 10 }}>
                  <button type="submit" disabled={forgotLoading} style={{ padding: '8px 16px' }}>
                    {forgotLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                  <button type="button" onClick={() => { setShowForgot(false); setForgotEmail(""); }} style={{ padding: '8px 16px', background: '#eee' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          <p>Don't have an account? <span
            style={{ color: signupHover ? '#218838' : '#28a745', cursor: 'pointer', transition: 'color 0.2s' }}
            onClick={() => navigate('/register')}
            onMouseEnter={() => setSignupHover(true)}
            onMouseLeave={() => setSignupHover(false)}
          >Sign Up</span></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
