import React, { useState } from 'react';
import './Schedule.css';

const Schedule = () => {
  const [genre, setGenre] = useState('R&B');
  const [datetime, setDatetime] = useState('');
  const [notification, setNotification] = useState('yes');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Schedule saved successfully!');
    // Reset fields
    setGenre('R&B');
    setDatetime('');
    setNotification('yes');
  };

  return (
    <div className="schedule-container">
      <h2 className="schedule-title">Music Scheduler</h2>
      <p className="schedule-description">Plan your music listening sessions here.</p>

      <form onSubmit={handleSubmit} className="schedule-form">
        <div className="form-group">
          <label htmlFor="genre" className="form-label">Genre:</label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="schedule-select"
          >
            <option value="Pop">Pop</option>
            <option value="R&B">R&B</option>
            <option value="Country">Country</option>
            <option value="Rock">Rock</option>
            <option value="Classical">Classical</option>
            <option value="Hip-Hop">Hip-Hop</option>
            <option value="EDM">EDM</option>
            <option value="IDM">IDM</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="datetime" className="form-label">Date and Time:</label>
          <input
            type="datetime-local"
            id="datetime"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="schedule-input"
          />
        </div>

        <fieldset className="form-group">
          <legend className="form-label">Notification</legend>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="notification"
                value="yes"
                checked={notification === 'yes'}
                onChange={() => setNotification('yes')}
              />
              Yes
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="notification"
                value="no"
                checked={notification === 'no'}
                onChange={() => setNotification('no')}
              />
              No
            </label>
          </div>
        </fieldset>

        <div className="button-group">
          <button type="submit" className="schedule-btn schedule-btn-primary">Save</button>
          <button type="reset" className="schedule-btn schedule-btn-secondary">Clear</button>
        </div>
      </form>
    </div>
  );
};

export default Schedule;
