import React from 'react';
import './Review.css';

export default function Review3() {
  return (
    <div className="container my-5">
      <a href="/review" className="btn btn-primary mb-4">Back to Reviews</a>
      <h2>OK Computer - Radiohead</h2>
      <hr />
      <div className="review-content">
        <h3>Review</h3>
        <p>
          "OK Computer" is often considered Radiohead’s magnum opus, exploring themes of alienation in the digital age. With tracks like "Paranoid Android" and "Karma Police," the album remains timeless.
        </p>
        <p><strong>Rating:</strong> 5.0/5</p>
        <p><strong>Date:</strong> October 4, 2024</p>
      </div>
    </div>
  );
}
