import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ReviewDetail.css';

const ReviewDetail = ({ reviews }) => {
  const { id } = useParams(); // Extract the ID from the URL
  const navigate = useNavigate();

  // Find the specific review by ID
  const review = reviews.find((review) => review.id === id);

  if (!review) {
    // If review not found, display 404
    return (
      <div className="container text-center my-5">
        <h2>404 - Review Not Found</h2>
        <p>The review you're looking for doesn't exist.</p>
        <button className="btn btn-primary" onClick={() => navigate('/review')}>
          Back to Reviews
        </button>
      </div>
    );
  }

  return (
    <div className="review-details-container">
      <h2 className="album-title">{review.album}</h2>
      <p className="artist-name">{review.artist}</p>
      <hr />
      <div className="review-content">
        <h3>Review</h3>
        <p>{review.review}</p>
        <p><strong>Rating:</strong> {review.rating}/5</p>
        <p><strong>Date:</strong> {review.date}</p>
      </div>
      <div className="back-button-container">
        <button className="btn btn-primary" onClick={() => navigate('/review')}>
          Back to Reviews
        </button>
      </div>
    </div>
  );
};

export default ReviewDetail;
