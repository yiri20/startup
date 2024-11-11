import React, { useState } from 'react';

const CreateReview = () => {
  const [album, setAlbum] = useState('');
  const [artist, setArtist] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Review Created!');
  };

  return (
    <div className="container my-5">
      <h2>Create a New Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="album">Album</label>
          <input type="text" id="album" value={album} onChange={(e) => setAlbum(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="artist">Artist</label>
          <input type="text" id="artist" value={artist} onChange={(e) => setArtist(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="rating">Rating</label>
          <input type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} className="form-control" required min="0" max="5" />
        </div>
        <div className="mb-3">
          <label htmlFor="review">Review</label>
          <textarea id="review" value={review} onChange={(e) => setReview(e.target.value)} className="form-control" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit Review</button>
      </form>
    </div>
  );
};

export default CreateReview;
