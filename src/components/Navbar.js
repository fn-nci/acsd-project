import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import Logo from './Logo';
import '../styles/Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownItemClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <Logo size="medium" />
        </Link>
        <div className="navbar-links">
          <Link to="/destinations" className="nav-link">
            Destinations
          </Link>
          <div className="dropdown" ref={dropdownRef}>
            <span className="nav-link dropdown-trigger" onClick={toggleDropdown}>
              Explore Ireland
              <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
            </span>
            <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
              <Link to="/hotels" className="dropdown-item" onClick={handleDropdownItemClick}>
                Hotels
              </Link>
              <Link to="/restaurants" className="dropdown-item" onClick={handleDropdownItemClick}>
                Restaurants
              </Link>
              <Link to="/irishweather" className="dropdown-item" onClick={handleDropdownItemClick}>
                Irish Weather
              </Link>
              <Link to="/irishinfo" className="dropdown-item" onClick={handleDropdownItemClick}>
                Irish Info
              </Link>
              <Link to="/irelandtraveltips" className="dropdown-item" onClick={handleDropdownItemClick}>
                Travel Tips
              </Link>
            </div>
          </div>
          <Link to="/contact_us" className="nav-link">
            Contact Us
          </Link>
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-name">
                Welcome, {user?.name}
              </span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 