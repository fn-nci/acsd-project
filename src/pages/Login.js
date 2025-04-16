import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, setError } from '../redux/slices/authSlice';
import { users } from '../data/users';
import Logo from '../components/Logo';
import '../styles/Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/destinations');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear any previous errors
    dispatch(setError(null));

    // Attempt to login
    dispatch(login(formData));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <Logo />
        </div>
        <h2>Welcome Back</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <button 
            type="submit" 
            className="login-button"
          >
            Login
          </button>
        </form>
        <div className="login-help">
          <p>Don't have an account? <a href="/register">Register</a></p>
          <div className="demo-credentials">
            <p>Demo Credentials:</p>
            <p>Email: {users[0].email}</p>
            <p>Password: {users[0].password}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 