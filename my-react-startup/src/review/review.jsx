import React from 'react';
import { Link } from 'react-router-dom';
import './Review.css';

export default function Review() {
  return (
    <main className="container my-5">
      <h2 className="text-center">Album Reviews</h2>
      <table className="table table-striped">
        <thead>
          <tr className="text-center">
            <th scope="col">Number</th>
            <th scope="col">Album</th>
            <th scope="col">Artist</th>
            <th scope="col">Rating</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><Link to="/review1" className="text-decoration-none">The Bends</Link></td>
            <td>Radiohead</td>
            <td><b>4.5</b></td>
            <td>August 20, 2024</td>
          </tr>
          <tr>
            <td>2</td>
            <td><Link to="/review2" className="text-decoration-none">In Rainbows</Link></td>
            <td>Radiohead</td>
            <td><b>4.8</b></td>
            <td>September 2, 2024</td>
          </tr>
          <tr>
            <td>3</td>
            <td><Link to="/review3" className="text-decoration-none">OK Computer</Link></td>
            <td>Radiohead</td>
            <td><b>5.0</b></td>
            <td>October 4, 2024</td>
          </tr>
        </tbody>
      </table>
      <div className="text-center my-4">
        <Link to="/makereview" className="btn btn-primary">Create Review</Link>
      </div>
      <hr />
      <section>
        <h2 className="text-center">Live Music Reviews</h2>
        <div id="live-reviews" className="text-center">
          <p>Loading live reviews...</p>
        </div>
      </section>
    </main>
  );
}
