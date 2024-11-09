import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (email === '' || password === '') {
      alert('Please fill out all fields');
      return;
    }

    // Mock sign-in process (In reality, you would connect this to your backend)
    if (email === 'test@example.com' && password === 'password') {
      alert('Sign-in successful');
      navigate('/'); // Redirect to the homepage after successful sign-in
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <main className="container my-5">
      <h2 className="text-center">Sign In</h2>
      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign In</button>
        <div className="text-center mt-3">
          <a href="/login" className="text-decoration-none">Don't have an account? Sign up here</a>
        </div>
      </form>
    </main>
  );
}
