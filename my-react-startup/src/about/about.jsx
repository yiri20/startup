import React from 'react';
import './about.css';

const About = () => {
  return (
    <>
      {/* Header Section */}
      <header className="text-center py-4">
        <h1><a href="/" className="text-decoration-none"><b>Plan Your Music</b></a></h1>
        <hr />
        <nav>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <a className="nav-link text-white" href="/schedule">Schedule</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/explore">Explore</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/review">Review</a>
            </li>
          </ul>
        </nav>
        <hr />
      </header>

      {/* Main Content Section */}
      <main className="container my-5">
        <figure id="figure">
          <img src="/topster.png" alt="Music genres and album rankings from Topster" />
          <figcaption>This is my topster! Isn't it cool??</figcaption>
        </figure>
        <p>
          Music holds a special place in everyone’s life—it can mean relaxation, inspiration, or even a form of self-expression...
        </p>
        <hr />
        <div id="resource">
          <h3>Useful Resources</h3>
          <ul>
            <li><a href="https://rateyourmusic.com/" target="_blank" rel="noopener noreferrer">Rate Your Music</a></li>
            <li><a href="https://topsters.org/" target="_blank" rel="noopener noreferrer">Topster</a></li>
          </ul>
        </div>
      </main>

      {/* Footer Section */}
      <footer>
        <hr />
        <span className="text-reset">Jungil Bae</span><br />
        <a href="https://github.com/yiri20/startup" className="text-reset text-decoration-none">
          <i className="fab fa-github"></i> GitHub
        </a>
      </footer>
    </>
  );
};

export default About;
