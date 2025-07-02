import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowRight } from 'react-icons/fa';

const BASE_URL = 'https://resume-maker-b545.onrender.com';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [arrowHover, setArrowHover] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const token = params.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) return toast.error('Please fill in all fields.');
    if (password !== confirmPassword) return toast.error('Passwords do not match.');
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/reset-password/${token}`, { password });
      toast.success(response.data.message || 'Password reset successful!');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Failed to reset password');
      } else {
        toast.error('Failed to reset password. Please try again.');
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
        <h1 style={{ marginTop: 0, marginBottom: 24 }}>Reset Password</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label htmlFor='password' style={{ marginBottom: 8 }}>New Password:</label>
          <input
            type="password"
            name='password'
            placeholder="Enter new password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ padding: 10, width: '100%', marginBottom: 10, borderRadius: 4, border: '1px solid #ccc' }}
          />
          <label htmlFor='confirmPassword' style={{ marginBottom: 8 }}>Confirm Password:</label>
          <input
            type="password"
            name='confirmPassword'
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
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
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword; 
