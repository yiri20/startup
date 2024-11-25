import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // For success or error messages

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Login successful!');
        // Here, you can add logic to redirect or save the user session
        console.log('User ID:', data.id); // Example: saving user ID
        setEmail('');
        setPassword('');
      } else if (response.status === 401) {
        setMessage('Invalid credentials. Please try again.');
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setMessage('Failed to login. Please check your connection.');
    }
  };

  return (
    <>
      <main className="login-container">
        <h2>Login to Your Account</h2>
        {message && <div className="alert">{message}</div>}
        <form onSubmit={handleSubmit} className="form-container">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="sample@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email Address"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" aria-label="Login Button">
            Login
          </button>
          <div className="signup-link">
            <a href="signin">If you don't have an account, sign up here</a>
          </div>
        </form>
      </main>
    </>
  );
}

export default Login;
