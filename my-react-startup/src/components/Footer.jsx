import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <hr />
      <span className="text-reset">Jungil Bae</span><br />
      <a href="https://github.com/yiri20/startup" className="text-reset text-decoration-none">
        <i className="fab fa-github social-icon"></i> GitHub
      </a>
    </footer>
  );
}

export default Footer;
