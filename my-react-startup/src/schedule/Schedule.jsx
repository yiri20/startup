import React, { useState } from 'react';
import './Schedule.css';

function Schedule() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      event.target.reset();
    }, 3000);
  };

  return (
    <>
      <header className="text-center py-4 bg-light">
        <h1><a href="/" className="text-decoration-none text-white">Plan Your Music</a></h1>
        <hr />
        <nav>
          <ul className="nav justify-content-center">
            <li className="nav-item"><a className="nav-link text-white" href="/review">Review</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/explore">Explore</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/about">About</a></li>
          </ul>
        </nav>
      </header>

      <main className="container my-5">
        <h2 className="text-center">Music Scheduler</h2>
        <p className="text-center">Plan your music listening sessions here.</p>

        <form id="schedule-form" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="select">Genre:</label>
            <select id="select" name="varSelect" className="form-select" aria-label="Select Genre">
              <option>Pop</option>
              <option selected>R&B</option>
              <option>Country</option>
              <option>Rock</option>
              <option>Classical</option>
              <option>Hip-Hop</option>
            </select>
          </div>

          <div>
            <label htmlFor="datetime">Date and Time:</label>
            <input type="datetime-local" name="varDatetime" id="datetime" className="form-control" required aria-label="Select Date and Time" />
          </div>

          <fieldset className="mb-3">
            <legend>Notification</legend>
            <div className="form-check">
              <input type="radio" id="yes" name="varNotification" value="yes" className="form-check-input" defaultChecked />
              <label htmlFor="yes" className="form-check-label">Yes</label>
            </div>
            <div className="form-check">
              <input type="radio" id="no" name="varNotification" value="no" className="form-check-input" />
              <label htmlFor="no" className="form-check-label">No</label>
            </div>
          </fieldset>

          <div className="text-center">
            <button type="submit" className="btn btn-success">Save</button>
            <button type="reset" className="btn btn-secondary ms-2">Clear</button>
          </div>
        </form>

        {showConfirmation && (
          <div id="confirmation-message" className="text-center mt-4">
            <p className="alert alert-success">Your schedule has been saved!</p>
          </div>
        )}
      </main>

      <footer className="bg-light text-center py-3">
        <hr />
        <span className="text-reset">Jungil Bae</span><br />
        <a href="https://github.com/yiri20/startup" className="text-reset text-decoration-none">GitHub</a>
      </footer>
    </>
  );
}

export default Schedule;
