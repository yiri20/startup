import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateReview = () => {
  const [album, setAlbum] = useState('');
  const [artist, setArtist] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new review object
    const newReview = {
      album,
      artist,
      rating,
      review,
      date: new Date().toLocaleDateString(), // Add today's date
    };

    // Send the new review to the backend
    fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create review');
        }
        return response.json();
      })
      .then(() => {
        alert('Review Created!');
        navigate('/'); // Redirect back to the reviews list
      })
      .catch((err) => {
        console.error(err);
        alert('An error occurred while creating the review.');
      });
  };

  return (
    <div className="container my-5">
      <h2>Create a New Review</h2>
      <form onSubmit={handleSubmit}>
        {/* Album Input */}
        <div className="mb-3">
          <label htmlFor="album" className="form-label">
            Album
          </label>
          <input
            type="text"
            id="album"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            className="form-control"
            required
          />
        </div>

        {/* Artist Input */}
        <div className="mb-3">
          <label htmlFor="artist" className="form-label">
            Artist
          </label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="form-control"
            required
          />
        </div>

        {/* Rating Input */}
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Rating (0 to 5)
          </label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="form-control"
            required
            min="0"
            max="5"
          />
        </div>

        {/* Review Textarea */}
        <div className="mb-3">
          <label htmlFor="review" className="form-label">
            Review
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="form-control"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
