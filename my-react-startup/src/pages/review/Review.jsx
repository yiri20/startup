import React from 'react';
import { Link } from 'react-router-dom';
import './review.css';

const Review = () => {
  return (
    <>
      {/* Main Review Section */}
      <main className="container my-5">
        <h2 className="text-center">Album Reviews</h2>
        
        {/* Album Reviews Table */}
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
              <td>
                <Link to="/review/1" className="text-decoration-none">The Bends</Link>
              </td>
              <td>Radiohead</td>
              <td>4.5</td>
              <td>August 20, 2024</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <Link to="/review/2" className="text-decoration-none">In Rainbows</Link>
              </td>
              <td>Radiohead</td>
              <td>4.8</td>
              <td>September 2, 2024</td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <Link to="/review/3" className="text-decoration-none">OK Computer</Link>
              </td>
              <td>Radiohead</td>
              <td>5.0</td>
              <td>October 4, 2024</td>
            </tr>
          </tbody>
        </table>

        {/* Link to Create a New Review */}
        <div className="text-center my-4">
          <Link to="/makereview" className="btn btn-primary">Create Review</Link>
        </div>
      </main>
    </>
  );
};

export default Review;
