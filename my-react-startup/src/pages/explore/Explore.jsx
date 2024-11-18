import React, { useState, useEffect } from 'react';
import './Explore.css';

const Explore = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/explore')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch explore data');
        }
        return response.json();
      })
      .then((data) => {
        setExploreItems(data.explore || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching explore data:', err);
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
      <div className="explore-grid">
        {exploreItems.map((item) => (
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
