// src/pages/home/Home.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-container">
      {user ? (
        <div className="welcome-message">
          <h2>Welcome, {user.email}!</h2>
          <p>We hope you enjoy planning your music sessions!</p>
        </div>
      ) : (
        <div className="home-box">
          <h2 className="home-header">Log into your account</h2>
          <div className="home-buttons">
            <Link to="/signin" className="btn btn-primary">Create</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
