import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-light text-center py-3">
      <hr />
      <span className="text-reset">Jungil Bae</span>
      <br />
      <a
        href="https://github.com/yiri20/startup"
        className="text-decoration-none"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <br />
      <Link to="/about" className="text-decoration-none">
        <b>About Us</b>
      </Link>
    </footer>
  );
}
