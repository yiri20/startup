import React from 'react';
import './review.css';

const Review = () => {
  return (
    <>
      <header className="text-center py-4">
        <h1><a href="/">Plan Your Music</a></h1>
        <hr />
        <nav>
          <ul className="nav justify-content-center">
            <li className="nav-item"><a className="nav-link text-white" href="/schedule">Schedule</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/explore">Explore</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/about">About</a></li>
          </ul>
        </nav>
        <hr />
      </header>

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

      <footer>
        <hr />
        <span className="text-reset">Jungil Bae</span><br />
        <a href="https://github.com/yiri20/startup">GitHub</a>
        <br />
        <a href="/about" className="text-decoration-none"><b>About Us</b></a>
      </footer>
    </>
  );
};

export default Review;
