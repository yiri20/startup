import React from 'react';
import './explore.css';

const Explore = () => {
  return (
    <>
      <header className="text-center py-4">
        <h1><a href="/">Plan Your Music</a></h1>
        <hr />
        <nav>
          <ul className="nav justify-content-center">
            <li className="nav-item"><a className="nav-link text-white" href="/schedule">Schedule</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/review">Review</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/about">About</a></li>
          </ul>
        </nav>
        <hr />
      </header>

      <main>
        <section id="trending-music">
          <h2>Trending Music</h2>
          <img src="/placeholder.jpg" alt="Placeholder for album art" className="album-placeholder" />
          <p className="text-center mt-4">Suggested albums or tracks will be displayed here. Discover new music tailored to your taste!</p>
        </section>
      </main>

      <footer>
        <hr />
        <span className="text-reset">Jungil Bae</span><br />
        <a href="https://github.com/yiri20/startup">GitHub</a>
        <br />
        <a href="/about" className="text-decoration-none"><b>About Us</b></a>
      </footer>
    </>
  );
};

export default Explore;
