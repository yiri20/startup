import React, { useState } from 'react';
import './authenticated.css';

export function Login({ onLogin }) {
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    onLogin(email);
  };

  return (
    <main className='container text-center'>
      <h2>Login</h2>
      <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
      <button onClick={handleLogin}>Login</button>
    </main>
  );
}
