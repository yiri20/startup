import React from 'react';
import { useParams } from 'react-router-dom';
import './review.css';

const reviewsData = [
  { id: 1, album: 'The Bends', artist: 'Radiohead', rating: 4.5, date: 'August 20, 2024' },
  { id: 2, album: 'In Rainbows', artist: 'Radiohead', rating: 4.8, date: 'September 2, 2024' },
  { id: 3, album: 'OK Computer', artist: 'Radiohead', rating: 5.0, date: 'October 4, 2024' },
];

const ReviewDetail = () => {
  const { id } = useParams();
  const review = reviewsData.find((r) => r.id === parseInt(id));

  if (!review) {
    return <h2>Review not found</h2>;
  }

  return (
    <main className="container my-5">
      <h2>{review.album} Review</h2>
      <p><strong>Artist:</strong> {review.artist}</p>
      <p><strong>Rating:</strong> {review.rating}</p>
      <p><strong>Date:</strong> {review.date}</p>
    </main>
  );
};

export default ReviewDetail;
