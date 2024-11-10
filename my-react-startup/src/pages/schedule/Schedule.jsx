import React from 'react';
import './schedule.css';

const Schedule = () => {
  return (
    <>
      <main className="schedule-container">
        <h2>Music Scheduler</h2>
        <p>Plan your music listening sessions here.</p>
        <form id="schedule-form">
          <div>
            <label htmlFor="select">Genre:</label>
            <select id="select" className="form-select">
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
            <input type="datetime-local" id="datetime" className="form-control" />
          </div>
          <fieldset>
            <legend>Notification</legend>
            <label><input type="radio" name="notification" value="yes" /> Yes</label>
            <label><input type="radio" name="notification" value="no" /> No</label>
          </fieldset>
          <div>
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="reset" className="btn btn-secondary">Clear</button>
          </div>
        </form>
      </main>

    </>
  );
};

export default Schedule;
