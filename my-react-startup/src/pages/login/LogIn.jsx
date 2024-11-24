import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState } from './authState';
import './login.css';

export default function Login({ userName, authState, onAuthChange }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  console.log('authState:', authState);

  async function handleLogin() {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        onAuthChange(data.id, AuthState.Authenticated);
        navigate('/dashboard'); // Redirect to a dashboard or home page
      } else {
        setError(data.message || 'Failed to log in. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
    }
  }

  return (
    <main className='container-fluid bg-secondary text-center'>
      <div className='login-container'>
        <h1>Login to Your Account</h1>
        {authState === AuthState.Unknown && <p>Loading...</p>}
        {authState === AuthState.Unauthenticated && (
          <>
            {error && <div className="error-message">{error}</div>}
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='form-control'
              />
            </div>
            <button className='btn btn-primary' onClick={handleLogin}>
              Login
            </button>
          </>
        )}
        {authState === AuthState.Authenticated && (
          <div>
            <h2>Welcome back, {userName}!</h2>
            <button
              className='btn btn-secondary'
              onClick={() => onAuthChange('', AuthState.Unauthenticated)}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
