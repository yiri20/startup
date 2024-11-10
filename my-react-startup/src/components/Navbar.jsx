import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure this is correct and exists

const Navbar = () => {
  return (
    <header className="navbar">
      <h1><Link to="/">Plan Your Music</Link></h1>
      <hr />
      <nav>
        <ul className="nav justify-content-center">
          <li className="nav-item"><Link to="/schedule" className="nav-link">Schedule</Link></li>
          <li className="nav-item"><Link to="/explore" className="nav-link">Explore</Link></li>
          <li className="nav-item"><Link to="/review" className="nav-link">Review</Link></li>
          <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
        </ul>
      </nav>
      <hr />
    </header>
  );
};

export default Navbar;
