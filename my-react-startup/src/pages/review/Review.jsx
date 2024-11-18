import React, { useState, useEffect } from 'react';
import './review.css';

const Review = () => {
  const [reviews, setReviews] = useState([]); // Reviews fetched from the backend
  const [newReview, setNewReview] = useState({
    album: '',
    artist: '',
    rating: '',
    review: '',
  }); // For creating new reviews
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState(null); // For error handling

  // Fetch reviews from the backend on component load
  useEffect(() => {
    fetch('/api/reviews')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched reviews:', data); // Debugging
        setReviews(data.reviews || []); // Ensure reviews array is used
      })
      .catch((err) => {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Please try again later.');
      });
  }, []);

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newReview.album && newReview.artist && newReview.rating && newReview.review) {
      const newEntry = {
        ...newReview,
        date: new Date().toLocaleDateString(), // Add date
      };

      // Post the new review to the backend
      fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to submit review');
          }
          return response.json();
        })
        .then((createdReview) => {
          console.log('Created review:', createdReview); // Debugging
          setReviews([...reviews, createdReview]); // Update local state
          setNewReview({ album: '', artist: '', rating: '', review: '' }); // Reset form
          setIsFormVisible(false); // Close form
        })
        .catch((err) => {
          console.error('Error submitting review:', err);
          setError('Failed to submit review. Please try again later.');
        });
    }
  };

  return (
    <>
      <main className="container my-5">
        <h2 className="text-center">Album Reviews</h2>

        {/* Error Display */}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Reviews Table */}
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Number</th>
              <th>Album</th>
              <th>Artist</th>
              <th>Rating</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <tr key={review.id || index}>
                  <td>{index + 1}</td>
                  <td>
                    <a href={`/review${review.id || index}`} className="text-decoration-none">
                      {review.album}
                    </a>
                  </td>
                  <td>{review.artist}</td>
                  <td>{review.rating}</td>
                  <td>{review.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No reviews available. Add your first review!
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Toggle Button */}
        <div className="text-center my-4">
          <button
            className={`btn ${isFormVisible ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            {isFormVisible ? 'Hide Review Form' : 'Create Review'}
          </button>
        </div>

        {/* Create Review Form */}
        {isFormVisible && (
          <div className="create-review-container my-5">
            <h3 className="text-center">Create a New Review</h3>
            <form onSubmit={handleSubmit}>
              {/* Album Input */}
              <div className="mb-3">
                <label className="form-label">Album</label>
                <input
                  type="text"
                  className="form-control"
                  name="album"
                  value={newReview.album}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Artist Input */}
              <div className="mb-3">
                <label className="form-label">Artist</label>
                <input
                  type="text"
                  className="form-control"
                  name="artist"
                  value={newReview.artist}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Rating Input */}
              <div className="d-flex align-items-center mb-3">
                <label className="form-label me-3">Rating (0 to 5):</label>
                <input
                  type="number"
                  className="form-control w-auto"
                  placeholder="Max 5"
                  name="rating"
                  value={newReview.rating}
                  onChange={handleInputChange}
                  min="0"
                  max="5"
                  step="0.1"
                  required
                />
              </div>

              {/* Review Textarea */}
              <div className="mb-3">
                <label className="form-label">Review</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="review"
                  value={newReview.review}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
            </form>
          </div>
        )}
      </main>
    </>
  );
};

export default Review;
