// src/pages/home/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-box">
        <h2 className="home-header">Log into your account</h2>
        <div className="home-buttons">
          <Link to="/signin" className="btn btn-primary">Create</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
