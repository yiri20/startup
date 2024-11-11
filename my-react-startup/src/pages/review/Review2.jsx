import React from 'react';
import { Link } from 'react-router-dom';
import './ReviewDetail.css';

const Review2 = () => {
  return (
    <div className="review-details-container">
      <h2>In Rainbows - Radiohead</h2>
      <hr />
      <section className="review-content">
        <h3>Review</h3>
        <p>
          "In Rainbows" is a masterpiece that showcases Radiohead's ability to blend electronic sounds with rock. The album was initially released as a "pay-what-you-want" download, making it a revolutionary release.
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

export default Review2;
