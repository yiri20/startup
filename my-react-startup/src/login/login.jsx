import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Dummy authentication logic for now
    if (email === 'test@example.com' && password === 'password') {
      alert('Login successful!');
      navigate('/review'); // Navigate to the Review page after login
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <main className="login-container">
      <h2 className="text-center">Login to Your Account</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sample@example.com"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
        <div className="signup-link text-center mt-3">
          <p>Don't have an account? <a href="/signin">Sign Up Here</a></p>
        </div>
      </form>
    </main>
  );
}
