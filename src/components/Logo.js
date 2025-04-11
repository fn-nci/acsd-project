import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Logo.scss';

const Logo = ({ size = 'medium' }) => {
  return (
    <Link to="/" className={`logo logo-${size}`}>
      <svg 
        viewBox="0 0 240 60" 
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Visit Ireland Logo"
      >
        {/* Shamrock shape */}
        <g className="logo-symbol">
          <path 
            d="M30 15C30 15 25 5 15 5C5 5 5 15 5 25C5 35 15 35 15 35C15 35 10 45 10 55C10 65 20 65 20 65C20 65 25 55 25 45C25 35 35 35 35 35C35 35 40 45 40 55C40 65 50 65 50 55C50 45 45 35 45 35C45 35 55 35 55 25C55 15 45 5 35 5C25 5 30 15 30 15Z" 
            fill="#2E7D32"
          />
          <circle cx="30" cy="20" r="5" fill="#FFC107" />
        </g>
        
        {/* Text */}
        <g className="logo-text">
          <text x="70" y="30" className="logo-text-primary">Visit</text>
          <text x="70" y="50" className="logo-text-secondary">Ireland</text>
        </g>
      </svg>
    </Link>
  );
};

export default Logo; 