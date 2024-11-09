import React from 'react';
import './review.css';

const Review1 = () => {
  return (
    <>
      {/* Header */}
      <header className="text-center py-4">
        <h1><a href="/" className="text-decoration-none">Plan Your Music</a></h1>
        <hr />
        <nav>
          <ul className="nav justify-content-center">
            <li className="nav-item"><a className="nav-link text-white" href="/schedule">Schedule</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/explore">Explore</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/about">About</a></li>
          </ul>
        </nav>
        <hr />
      </header>

      {/* Main Content */}
      <main className="container my-5">
        <h2 className="text-center">Review: The Bends by Radiohead</h2>
        <p><strong>Artist:</strong> Radiohead</p>
        <p><strong>Album:</strong> The Bends</p>
        <p><strong>Rating:</strong> 4.5 / 5</p>
        <p><strong>Date Reviewed:</strong> August 20, 2024</p>
        <p>
          "The Bends" is an iconic album that marked Radiohead's transition from their early grunge-inspired sound to a more expansive and emotional style. Songs like "Street Spirit (Fade Out)" and "Fake Plastic Trees" showcase the band's ability to blend intricate instrumentation with deeply personal lyrics.
        </p>
        <a href="/review" className="back-link">&larr; Back to All Reviews</a>
      </main>

      {/* Footer */}
      <footer>
        <hr />
        <span className="text-reset">Jungil Bae</span><br />
        <a href="https://github.com/yiri20/startup" className="text-decoration-none">GitHub</a>
        <br />
        <a href="/about" className="text-decoration-none"><b>About Us</b></a>
      </footer>
    </>
  );
};

export default Review1;
