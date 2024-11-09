import React from 'react';
import './about.css';

export function About() {
  return (
    <main className='container-fluid text-center bg-secondary'>
      <h2>About Us</h2>
      <p>Your music journey starts here!</p>
      <img src='/placeholder.jpg' alt='Music' />
      <blockquote>"Music is the language of the soul."</blockquote>
    </main>
  );
}
