import React from 'react';
import './review.css';


const Review = () => {
  return (
    <>
      <main className="container my-5">
        <h2 className="text-center">Album Reviews</h2>
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
            <tr>
              <td>1</td>
              <td><a href="/review1" className="text-decoration-none">The Bends</a></td>
              <td>Radiohead</td>
              <td>4.5</td>
              <td>August 20, 2024</td>
            </tr>
            <tr>
              <td>2</td>
              <td><a href="/review2" className="text-decoration-none">In Rainbows</a></td>
              <td>Radiohead</td>
              <td>4.8</td>
              <td>September 2, 2024</td>
            </tr>
            <tr>
              <td>3</td>
              <td><a href="/review3" className="text-decoration-none">OK Computer</a></td>
              <td>Radiohead</td>
              <td>5.0</td>
              <td>October 4, 2024</td>
            </tr>
          </tbody>
        </table>
        <div className="text-center my-4">
          <a href="/makereview" className="btn btn-primary">Create Review</a>
        </div>
      </main>
    </>
  );
};

export default Review;
