import React, { useEffect, useState } from 'react';
import './Explore.css';

const Explore = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/explore')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch explore data');
        }
        return response.json();
      })
      .then((data) => setItems(data.explore || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="explore-container">
      <h2 className="explore-title">Explore Trending Music</h2>
      {error && <div className="error">{error}</div>}
      <div className="explore-grid">
        {items.map((item) => (
          <div key={item.id} className="explore-card">
            <img src={item.image} alt={item.title} className="explore-image" />
            <h3 className="explore-item-title">{item.title}</h3>
            <p className="explore-item-artist">{item.artist}</p>
            <p className="explore-item-description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
