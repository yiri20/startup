import React from 'react';
import './about.css';

const About = () => {
  return (
    <>
      <main className="about-container">
        <figure className="about-figure">
          <img src="/topster.png" alt="Music genres and album rankings from Topster" />
          <figcaption>This is my topster! Isn't it cool??</figcaption>
        </figure>
        <p>
          Music holds a special place in everyone’s life—it can mean relaxation, inspiration, 
          or even a form of self-expression. Explore and plan your music journey with us!
        </p>
        <hr />
        <div className="about-resource">
          <h3>Useful Resources</h3>
          <ul>
            <li><a href="https://rateyourmusic.com/">Rate Your Music</a></li>
            <li><a href="https://topsters.org/">Topster</a></li>
          </ul>
        </div>
      </main>

    </>
  );
};

export default About;
