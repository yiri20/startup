import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './Explore.css';

const Explore = () => {
  const { user } = useContext(AuthContext);
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = '/api/explore'; // Use relative URL for consistency
    console.log('Attempting to fetch data from', url);

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          console.error('Error fetching data:', response.status, response.statusText);
          throw new Error('Failed to fetch explore items');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched explore data:', data);
        const formattedData = data.explore.map((item) => ({
          id: item.collectionId,
          title: item.collectionName,
          artist: item.artistName,
          image: item.artworkUrl100,
          genre: item.primaryGenreName,
        }));
        setExploreItems(formattedData);
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
              <p className="explore-item-genre">{item.genre}</p>
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
