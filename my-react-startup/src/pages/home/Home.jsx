// src/pages/home/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Main Content Section */}
      <main>
        <h3>Log into your account</h3>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <Link to="/signin" className="btn btn-primary">Create</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
