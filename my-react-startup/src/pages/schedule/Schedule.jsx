import React, { useState, useEffect } from 'react';
import './Schedule.css';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]); // For storing schedules from the backend
  const [newSchedule, setNewSchedule] = useState({
    genre: 'R&B',
    datetime: '',
    notification: true,
  });

  // Fetch schedules from the backend when the component loads
  useEffect(() => {
    fetch('/api/schedules')
      .then((response) => response.json())
      .then((data) => setSchedules(data.schedules || []))
      .catch((err) => console.error('Failed to fetch schedules:', err));
  }, []);

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewSchedule((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Submit the new schedule to the backend
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/schedules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSchedule),
    })
      .then((response) => response.json())
      .then((createdSchedule) => {
        setSchedules((prev) => [...prev, createdSchedule]); // Add new schedule to the list
        setNewSchedule({ genre: 'R&B', datetime: '', notification: true }); // Reset the form
      })
      .catch((err) => console.error('Failed to create schedule:', err));
  };

  // Delete a schedule
  const handleDelete = (id) => {
    fetch(`/api/schedules/${id}`, { method: 'DELETE' })
      .then(() => {
        setSchedules((prev) => prev.filter((schedule) => schedule.id !== id));
      })
      .catch((err) => console.error('Failed to delete schedule:', err));
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
            name="genre"
            value={newSchedule.genre}
            onChange={handleInputChange}
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
            name="datetime"
            value={newSchedule.datetime}
            onChange={handleInputChange}
            className="schedule-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="notification" className="form-label">Notification:</label>
          <input
            type="checkbox"
            id="notification"
            name="notification"
            checked={newSchedule.notification}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="schedule-btn schedule-btn-primary">Save</button>
      </form>

      <div className="schedules-list">
        <h3>Scheduled Sessions</h3>
        {schedules.length > 0 ? (
          <ul>
            {schedules.map((schedule) => (
              <li key={schedule.id}>
                <strong>{schedule.genre}</strong> on <em>{schedule.datetime}</em>{' '}
                {schedule.notification && <span>(Notification enabled)</span>}
                <button
                  className="schedule-btn schedule-btn-secondary"
                  onClick={() => handleDelete(schedule.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No scheduled sessions yet. Add one!</p>
        )}
      </div>
    </div>
  );
};

export default Schedule;
