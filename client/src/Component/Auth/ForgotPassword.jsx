import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowRight } from 'react-icons/fa';

const BASE_URL = 'https://resume-maker-b545.onrender.com';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [arrowHover, setArrowHover] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email.');
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/forgot-password`, { email });
      toast.success(response.data.message || 'Password reset link sent!');
      setEmail("");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Failed to send reset link');
      } else {
        toast.error('Failed to send reset link. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-container">
      <ToastContainer />
      <div className='login-container' style={{ position: 'relative', paddingTop: 30 }}>
        <span
          style={{ cursor: 'pointer', fontSize: 24, position: 'absolute', top: 10, right: 10, color: arrowHover ? '#218838' : '#28a745', transition: 'color 0.2s' }}
          onClick={() => navigate('/')}
          title="Back to Login"
          onMouseEnter={() => setArrowHover(true)}
          onMouseLeave={() => setArrowHover(false)}
        >
          <FaArrowRight />
        </span>
        <h1 style={{ marginTop: 0, marginBottom: 24 }}>Forgot Password</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label htmlFor='forgot-email' style={{ marginBottom: 8 }}>Email:</label>
          <input
            type="email"
            name='forgot-email'
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ padding: 10, width: '100%', marginBottom: 10, borderRadius: 4, border: '1px solid #ccc' }}
          />
          <button
            type='submit'
            disabled={loading}
            style={{
              marginTop: 10,
              padding: '10px 0',
              borderRadius: 4,
              background: btnHover ? '#218838' : '#28a745',
              color: '#fff',
              border: 'none',
              fontWeight: 'bold',
              transition: 'background 0.2s'
            }}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword; 
