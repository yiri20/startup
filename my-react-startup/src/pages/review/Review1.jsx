import React from 'react';
import { Link } from 'react-router-dom';
import './ReviewDetail.css';

const Review1 = () => {
  return (
    <div className="review-details-container">
      <h2>In Rainbows - Radiohead</h2>
      <hr />
      <section className="review-content">
        <h3>Review</h3>
        <p>
        "The Bends" is a quintessential album that marked Radiohead's transition from their grunge-inspired roots to a more sophisticated and emotionally resonant sound. With iconic tracks like "Fake Plastic Trees" and "Street Spirit (Fade Out)," the album explores themes of alienation, self-reflection, and human vulnerability. Its lush instrumentation and Thom Yorke's haunting vocals make it a timeless masterpiece that resonates with listeners on a deeply emotional level.
        </p>
        <p><strong>Rating:</strong> 4.8/5</p>
        <p><strong>Date:</strong> September 2, 2024</p>
      </section>

      {/* "Back to Reviews" button at the bottom */}
      <div className="back-button-container">
        <Link to="/review" className="btn btn-primary">Back to Reviews</Link>
      </div>
    </div>
  );
};

export default Review1;
