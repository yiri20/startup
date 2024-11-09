// src/explore/Explore.jsx
import React from 'react';
import './Explore.css';

function Explore() {
  return (
    <div className="container-fluid">
      {/* Header Section */}
      <header className="text-center py-4 bg-primary">
        <h1 className="text-white">
          <a href="/" className="text-decoration-none">Plan Your Music</a>
        </h1>
        <hr className="header-divider" />
        <nav>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <a className="nav-link text-white" href="/schedule">Schedule</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/review">Review</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/about">About</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="text-center py-4">
        <section id="trending-music">
          <h2>Trending Music</h2>
          <img 
            src="/placeholder.jpg" 
            alt="Placeholder for album art" 
            className="album-art"
          />
          <p>Suggested albums or tracks will be displayed here.</p>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <hr />
        <span className="text-reset">Jungil Bae</span>
        <br />
        <a href="https://github.com/yiri20/startup" className="text-decoration-none">
          GitHub
        </a>
      </footer>
    </div>
  );
}

export default Explore;
