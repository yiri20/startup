import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ReviewDetail.css';

const ReviewDetail = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch review details when component loads
  useEffect(() => {
    fetch(`/api/reviews/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch review');
        }
        return response.json();
      })
      .then((data) => {
        setReview(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching review:', err);
        setError('Failed to load review. Please try again later.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="container my-5 text-center alert alert-danger">{error}</div>;
  }

  if (!review) {
    return (
      <div className="container my-5 text-center alert alert-warning">
        Review not found.
      </div>
    );
  }

  return (
    <div className="review-details-container">
      <h2>{review.album} - {review.artist}</h2>
      <hr />

      <section className="review-content">
        <h3>Review</h3>
        <p>{review.review}</p>
        <p><strong>Rating:</strong> {review.rating}/5</p>
        <p><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
      </section>

      <div className="back-button-container">
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Back to Reviews
        </button>
      </div>
    </div>
  );
};

export default ReviewDetail;
