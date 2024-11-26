import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './Schedule.css';

const Schedule = () => {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]); // Initialize as an empty array
  const [genre, setGenre] = useState('');
  const [datetime, setDatetime] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [notification, setNotification] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingSessionId, setEditingSessionId] = useState(null); // To track which session is being edited

  // Fetch existing schedules when the component loads
  useEffect(() => {
    if (user) {
      fetch('/api/schedules', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch sessions');
          }
          return response.json();
        })
        .then((data) => {
          setSessions(data.schedules || []); // Make sure it is an array
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching sessions:', err);
          setError('Failed to load sessions. Please try again later.');
          setLoading(false);
        });
    }
  }, [user]);

  // Handle form submission to save or update a schedule
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!genre || !datetime || !artist || !album) {
      setError('All fields are required.');
      return;
    }

    const newSession = {
      genre,
      datetime,
      artist,
      album,
      notification,
      userId: user.email,
    };

    if (editingSessionId) {
      // Update existing session
      fetch(`/api/schedules/${editingSessionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSession),
        credentials: 'include',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update schedule');
          }
          return response.json();
        })
        .then((updatedSession) => {
          setSessions(sessions.map((session) => (session.id === editingSessionId ? updatedSession : session)));
          resetForm();
        })
        .catch((err) => {
          console.error('Error updating schedule:', err);
          setError('Failed to update schedule. Please try again later.');
        });
    } else {
      // Save new session to the backend
      fetch('/api/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSession),
        credentials: 'include',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to save schedule');
          }
          return response.json();
        })
        .then((createdSession) => {
          setSessions([...sessions, createdSession]); // Add new session to existing sessions
          resetForm();
        })
        .catch((err) => {
          console.error('Error saving schedule:', err);
          setError('Failed to save schedule. Please try again later.');
        });
    }
  };

  // Handle deletion of a schedule
  const handleDelete = (id) => {
    fetch(`/api/schedules/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((response) => {
        console.log('Deleting schedule with ID:', id);
        if (!response.ok) {
          throw new Error('Failed to delete schedule');
        }
        setSessions(sessions.filter((session) => session._id !== id));
      })
      .catch((err) => {
        console.error('Error deleting schedule:', err);
        setError('Failed to delete schedule. Please try again later.');
      });
  };

  // Handle editing of a schedule
  const handleEdit = (session) => {
    setEditingSessionId(session.id);
    setGenre(session.genre);
    setDatetime(session.datetime);
    setArtist(session.artist);
    setAlbum(session.album);
    setNotification(session.notification);
  };

  // Reset form after saving or updating
  const resetForm = () => {
    setGenre('');
    setDatetime('');
    setArtist('');
    setAlbum('');
    setNotification(false);
    setEditingSessionId(null);
  };

  return (
    <div className="schedule-container">
      <h2 className="schedule-title">Music Scheduler</h2>
      <p className="schedule-description">Plan your music listening sessions here.</p>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="schedule-form">
        <div className="form-group">
          <label htmlFor="genre" className="form-label">Genre:</label>
          <select
            id="genre"
            className="schedule-select"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          >
            <option value="">Select a genre</option>
            <option value="R&B">R&B</option>
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
            <option value="Jazz">Jazz</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="artist" className="form-label">Artist:</label>
          <input
            type="text"
            id="artist"
            className="schedule-input"
            placeholder="Enter artist name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="album" className="form-label">Album:</label>
          <input
            type="text"
            id="album"
            className="schedule-input"
            placeholder="Enter album name"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="datetime" className="form-label">Date and Time:</label>
          <input
            type="datetime-local"
            id="datetime"
            className="schedule-input"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="notification" className="form-label">Notification:</label>
          <input
            type="checkbox"
            id="notification"
            checked={notification}
            onChange={(e) => setNotification(e.target.checked)}
          />
        </div>

        <button type="submit" className="schedule-btn schedule-btn-primary">
          {editingSessionId ? 'Update' : 'Save'}
        </button>
      </form>

      <div className="schedules-list">
        <h3>Scheduled Sessions</h3>
        {loading ? (
          <p>Loading sessions...</p>
        ) : (
          <ul>
            {sessions.length > 0 ? (
              sessions.map((session, index) => (
                <li key={index}>
                  <div>
                    <strong>Genre:</strong> {session.genre}<br />
                    <strong>Artist:</strong> {session.artist}<br />
                    <strong>Album:</strong> {session.album}<br />
                    <strong>Date and Time:</strong> {session.datetime}<br />
                    <strong>Notification:</strong> {session.notification ? 'Yes' : 'No'}
                  </div>
                  <div>
                    <button className="schedule-btn schedule-btn-secondary" onClick={() => handleEdit(session)}>Edit</button>
                    <button className="schedule-btn schedule-btn-secondary" onClick={() => handleDelete(session._id)}>Delete</button>
                  </div>
                </li>
              ))
            ) : (
              <p>No scheduled sessions yet. Add one!</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Schedule;
