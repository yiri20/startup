import React from 'react';
import './Review.css';

export default function MakeReview() {
  return (
    <main className="container my-5">
      <h2 className="text-center">Submit a New Review</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="artist" className="form-label">Artist</label>
          <input type="text" id="artist" name="artist" className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="album" className="form-label">Album</label>
          <input type="text" id="album" name="album" className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="review" className="form-label">Review</label>
          <textarea id="review" name="review" className="form-control" rows="4" required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rating</label>
          <input type="number" id="rating" name="rating" className="form-control" min="1" max="5" required />
        </div>
        <button type="submit" className="btn btn-success">Submit Review</button>
      </form>
    </main>
  );
}
