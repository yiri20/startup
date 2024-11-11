import React, { useState } from 'react';
import './review.css';

const Review = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      album: 'The Bends',
      artist: 'Radiohead',
      rating: 4.5,
      date: 'August 20, 2024',
      review: 'A timeless classic with deep emotional resonance.'
    },
    {
      id: 2,
      album: 'In Rainbows',
      artist: 'Radiohead',
      rating: 4.8,
      date: 'September 2, 2024',
      review: 'A beautiful blend of electronic and rock sounds.'
    },
    {
      id: 3,
      album: 'OK Computer',
      artist: 'Radiohead',
      rating: 5.0,
      date: 'October 4, 2024',
      review: 'A groundbreaking album that defined a generation.'
    }
  ]);

  const [newReview, setNewReview] = useState({
    album: '',
    artist: '',
    rating: '',
    review: ''
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.album && newReview.artist && newReview.rating && newReview.review) {
      const newEntry = {
        ...newReview,
        id: reviews.length + 1,
        date: new Date().toLocaleDateString()
      };
      setReviews([...reviews, newEntry]);
      setNewReview({ album: '', artist: '', rating: '', review: '' });
      setIsFormVisible(false); // Close the form after submitting
    }
  };

  return (
    <>
      <main className="container my-5">
        <h2 className="text-center">Album Reviews</h2>
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
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td><a href={`/review${review.id}`} className="text-decoration-none">{review.album}</a></td>
                <td>{review.artist}</td>
                <td>{review.rating}</td>
                <td>{review.date}</td>
              </tr>
            ))}
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
              <button
                className={`btn toggle-button ${isFormVisible ? 'btn-secondary' : 'btn-primary'}`}
                onClick={() => setIsFormVisible(!isFormVisible)}
              >
                {isFormVisible ? 'Hide Review Form' : 'Create Review'}
              </button>

            </form>
          </div>
        )}
      </main>
    </>
  );
};

export default Review;
