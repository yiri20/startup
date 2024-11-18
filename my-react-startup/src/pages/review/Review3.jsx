import React from 'react';
import { Link } from 'react-router-dom';
import './ReviewDetail.css';

const Review3 = () => {
  return (
    <div className="review-details-container">
      <h2>OK Computer - Radiohead</h2>
      <hr />
      <section className="review-content">
        <h3>Review</h3>
        <p>
        "OK Computer" is an iconic album that solidified Radiohead's place in music history. Its themes of alienation and technology are still relevant today, making it a timeless masterpiece.
        </p>
        <p><strong>Rating:</strong> 5/5</p>
        <p><strong>Date:</strong> October 4, 2024</p>
      </section>

      {/* "Back to Reviews" button at the bottom */}
      <div className="back-button-container">
        <Link to="/review" className="btn btn-primary">Back to Reviews</Link>
      </div>
    </div>
  );
};

export default Review3;
