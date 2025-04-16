import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, setError } from '../redux/slices/authSlice';
import { users } from '../data/users';
import Logo from '../components/Logo';
import '../styles/Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching credentials
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        // Create user object without password
        const { password, ...userWithoutPassword } = user;
        
        dispatch(login(userWithoutPassword));
        navigate('/destinations');
      } else {
        dispatch(setError('Invalid email or password'));
      }
    } catch (err) {
      dispatch(setError(err.message));
    }
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
            <p>Email: test@test.com</p>
            <p>Password: 123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 