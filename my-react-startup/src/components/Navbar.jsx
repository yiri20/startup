import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="navbar">
      <h1>
        <Link to="/">Plan Your Music</Link>
      </h1>

      {user ? (
        <>
          <hr />
          <nav>
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <Link to="/schedule" className="nav-link">
                  Schedule
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/explore" className="nav-link">
                  Explore
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/review" className="nav-link">
                  Review
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link logout-text"
                  onClick={logout}
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </span>
              </li>
            </ul>
          </nav>
          <hr />
        </>
      ) : (
        <></>
      )}
    </header>
  );
};

export default Navbar;
