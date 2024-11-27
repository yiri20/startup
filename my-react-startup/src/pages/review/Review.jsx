import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Review.css';

const Review = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]); // Reviews fetched from the backend
  const [newReview, setNewReview] = useState({
    album: '',
    artist: '',
    rating: '',
    review: '',
  }); // For creating new reviews
  const [editReview, setEditReview] = useState(null); // For editing reviews
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState(null); // For error handling
  const [loading, setLoading] = useState(true); // For loading state
  const [isSubmitting, setIsSubmitting] = useState(false); // For form submission state
  const navigate = useNavigate();

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
        setReviews(data.reviews || []); // Ensure reviews array is used
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editReview) {
      setEditReview({ ...editReview, [name]: value });
    } else {
      setNewReview({ ...newReview, [name]: value });
    }
  };

  // Handle form submission for creating or editing a review
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const reviewData = editReview || newReview;
    if (reviewData.album && reviewData.artist && reviewData.rating && reviewData.review) {
      const requestMethod = editReview ? 'PUT' : 'POST';
      const endpoint = editReview ? `/api/reviews/${editReview._id}` : '/api/reviews';

      // Post or put the review to the backend
      fetch(endpoint, {
        method: requestMethod,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to submit review');
          }
          return response.json();
        })
        .then((createdOrUpdatedReview) => {
          if (editReview) {
            setReviews(
              reviews.map((review) =>
                review._id === createdOrUpdatedReview._id ? createdOrUpdatedReview : review
              )
            );
          } else {
            setReviews([...reviews, createdOrUpdatedReview]); // Update local state
          }
          setNewReview({ album: '', artist: '', rating: '', review: '' }); // Reset form
          setEditReview(null); // Clear edit state
          setIsFormVisible(false); // Close form
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

  // Handle navigating to review details
  const handleReviewClick = (reviewId) => {
    navigate(`/review/${reviewId}`);
  };

  // Handle deleting a review
  const handleDelete = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete review');
        }
        setReviews(reviews.filter((review) => review._id !== reviewId));
      })
      .catch((err) => {
        console.error('Error deleting review:', err);
        setError('Failed to delete review. Please try again later.');
      });
    }
  };

  // Handle editing a review
  const handleEdit = (review) => {
    setEditReview(review);
    setIsFormVisible(true);
  };

  return (
    <main className="container my-5">
      <h2 className="text-center">Album Reviews</h2>

      {/* Error Display */}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* Welcome Message */}
      {user && <div className="alert alert-info text-center">Welcome, {user.email}!</div>}

      {/* Loader */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Reviews Table */}
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Number</th>
                <th>Album</th>
                <th>Artist</th>
                <th>Rating</th>
                <th>Date</th>
                <th>User</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <tr key={review._id || index}>
                    <td>{index + 1}</td>
                    <td>
                      <span
                        className="text-decoration-none"
                        style={{ cursor: 'pointer', color: '#0454a8' }}
                        onClick={() => handleReviewClick(review._id)}
                      >
                        {review.album}
                      </span>
                    </td>
                    <td>{review.artist}</td>
                    <td>{review.rating}</td>
                    <td>{new Date(review.date).toLocaleDateString()}</td>
                    <td>{review.user}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(review)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(review._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No reviews available. Add your first review!
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Toggle Button */}
          {user && (
            <div className="text-center my-4">
              <button
                className={`btn ${isFormVisible ? 'btn-secondary' : 'btn-primary'}`}
                onClick={() => {
                  setIsFormVisible(!isFormVisible);
                  setEditReview(null);
                }}
              >
                {isFormVisible ? 'Hide Review Form' : 'Create Review'}
              </button>
            </div>
          )}

          {/* Create/Edit Review Form */}
          {isFormVisible && (
            <div className="create-review-container my-5">
              <h3 className="text-center">{editReview ? 'Edit Review' : 'Create a New Review'}</h3>
              <form onSubmit={handleSubmit}>
                {/* Album Input */}
                <div className="mb-3">
                  <label className="form-label">Album</label>
                  <input
                    type="text"
                    className="form-control"
                    name="album"
                    value={editReview ? editReview.album : newReview.album}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Artist Input */}
                <div className="mb-3">
                  <label className="form-label">Artist</label>
                  <input
                    type="text"
                    className="form-control"
                    name="artist"
                    value={editReview ? editReview.artist : newReview.artist}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
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
                    value={editReview ? editReview.rating : newReview.rating}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Review Textarea */}
                <div className="mb-3">
                  <label className="form-label">Review</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    name="review"
                    value={editReview ? editReview.review : newReview.review}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : editReview ? 'Update Review' : 'Submit Review'}
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Review;
