import React from 'react';
import './review.css';

const Review3 = () => {
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
        <h2 className="text-center">Review: OK Computer by Radiohead</h2>
        <p><strong>Artist:</strong> Radiohead</p>
        <p><strong>Album:</strong> OK Computer</p>
        <p><strong>Rating:</strong> 5.0 / 5</p>
        <p><strong>Date Reviewed:</strong> October 4, 2024</p>
        <p>
          "OK Computer" is often regarded as one of the greatest albums of all time, pushing the boundaries of rock music with its experimental soundscapes and thought-provoking lyrics. Tracks like "Paranoid Android" and "Karma Police" remain iconic, showcasing Radiohead’s ability to blend complex themes with accessible melodies.
        </p>
        <a href="/review" className="back-link">&larr; Back to All Reviews</a>
      </main>
    </>
  );
};

export default Review3;
