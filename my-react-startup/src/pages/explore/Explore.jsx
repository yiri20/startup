import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './Explore.css';

const Explore = () => {
  const { user } = useContext(AuthContext);
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/explore')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch explore data');
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.explore) {
          setExploreItems(data.explore);
        } else {
          throw new Error('Invalid data format');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching explore data:', err);
        setError('Failed to load explore items. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading Explore Items...</p>
      </div>
    );
  }

  return (
    <div className="explore-container">
      <h2 className="explore-title">Explore Trending Music</h2>
      {user && <div className="alert alert-info text-center">Welcome, {user.email}!</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <div className="explore-grid">
        {exploreItems.length > 0 ? (
          exploreItems.map((item) => (
            <div key={item.id} className="explore-card">
              <img src={item.image} alt={item.title} className="explore-image" />
              <h3 className="explore-item-title">{item.title}</h3>
              <p className="explore-item-artist">{item.artist}</p>
              <p className="explore-item-description">{item.description}</p>
            </div>
          ))
        ) : (
          <div className="alert alert-warning text-center">
            No explore items available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
