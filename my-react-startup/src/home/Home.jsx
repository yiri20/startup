import React from 'react';

function Home() {
  return (
    <div>
      <header className="bg-light text-center py-4">
        <h1>Plan Your Music</h1>
        <hr />
        <nav>
          <ul className="nav justify-content-center">
            <li className="nav-item"><a href="/schedule">Schedule</a></li>
            <li className="nav-item"><a href="/review">Review</a></li>
            <li className="nav-item"><a href="/explore">Explore</a></li>
            <li className="nav-item"><a href="/about">About</a></li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Home;
