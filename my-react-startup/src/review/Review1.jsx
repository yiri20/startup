import React from 'react';
import '../review/Review.css';

export default function Review1() {
  return (
    <div className="container my-5">
      <a href="/review" className="btn btn-primary mb-4">Back to Reviews</a>
      <h2>The Bends - Radiohead</h2>
      <hr />
      <div className="review-content">
        <h3>Review</h3>
        <p>
          "The Bends" is a seminal album by Radiohead that helped the band evolve from their grunge roots into something more innovative. Tracks like "High and Dry" and "Street Spirit" remain iconic. This album is a journey into deeper and darker territory.
        </p>
        <p><strong>Rating:</strong> 4.5/5</p>
        <p><strong>Date:</strong> August 20, 2024</p>
      </div>
    </div>
  );
}
