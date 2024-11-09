import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/schedule">Schedule</NavLink>
      <NavLink to="/review">Review</NavLink>
      <NavLink to="/explore">Explore</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  );
}
