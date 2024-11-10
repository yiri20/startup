import React from 'react';
import './explore.css';

const Explore = () => {
  return (
    <>
      <main className="container">
        <section id="trending-music">
          <h2>Trending Music</h2>
          <img src="/placeholder.jpg" alt="Placeholder for album art" className="album-placeholder" />
          <p className="text-center mt-4">
            Suggested albums or tracks will be displayed here. Discover new music tailored to your taste!
          </p>
        </section>
      </main>
    </>
  );
};

export default Explore;
