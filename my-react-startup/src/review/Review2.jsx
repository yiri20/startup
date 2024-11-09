import React from 'react';
import '../review/Review.css';

export default function Review2() {
  return (
    <div className="container my-5">
      <a href="/review" className="btn btn-primary mb-4">Back to Reviews</a>
      <h2>In Rainbows - Radiohead</h2>
      <hr />
      <div className="review-content">
        <h3>Review</h3>
        <p>
          "In Rainbows" is a masterpiece that showcases Radiohead's ability to blend electronic sounds with rock. The album was initially released as a "pay-what-you-want" download, making it a revolutionary release.
        </p>
        <p><strong>Rating:</strong> 4.8/5</p>
        <p><strong>Date:</strong> September 2, 2024</p>
      </div>
    </div>
  );
}
