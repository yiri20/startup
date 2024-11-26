import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './CreateReview.css';

const CreateReview = ({ onReviewSubmitted }) => {
  const { user } = useContext(AuthContext);
  const [newReview, setNewReview] = useState({
    album: '',
    artist: '',
    rating: '',
    review: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (newReview.album && newReview.artist && newReview.rating && newReview.review) {
      const reviewToSubmit = {
        ...newReview,
        user: user?.email || 'Anonymous', // Add user info to review
        date: new Date().toISOString(), // Add date in ISO format
      };

      // Post the new review to the backend
      fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewToSubmit),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to submit review');
          }
          return response.json();
        })
        .then((createdReview) => {
          setNewReview({ album: '', artist: '', rating: '', review: '' });
          if (onReviewSubmitted) {
            onReviewSubmitted(createdReview); // Callback to update parent component
          }
        })
        .catch((err) => {
          console.error('Error submitting review:', err);
          setError('Failed to submit review. Please try again later.');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      setError('All fields are required to submit a review.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-review-container">
      <h3>Create a New Review</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Album</label>
          <input
            type="text"
            className="form-control"
            name="album"
            value={newReview.album}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Artist</label>
          <input
            type="text"
            className="form-control"
            name="artist"
            value={newReview.artist}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating (0-5)</label>
          <input
            type="number"
            className="form-control"
            name="rating"
            value={newReview.rating}
            onChange={handleInputChange}
            min="0"
            max="5"
            step="0.1"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Review</label>
          <textarea
            className="form-control"
            name="review"
            value={newReview.review}
            onChange={handleInputChange}
            rows="4"
            required
            disabled={isSubmitting}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
