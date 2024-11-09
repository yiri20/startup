import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="text-center py-4 bg-primary">
      <h1>
        <NavLink to="/" className="text-white text-decoration-none"><b>Plan Your Music</b></NavLink>
      </h1>
      <hr />
      <nav>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/schedule">Schedule</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/explore">Explore</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/review">Review</NavLink>
          </li>
        </ul>
      </nav>
      <hr />
    </header>
  );
}

export default Navbar;
