import React, { useState, useContext } from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [promo, setPromo] = useState('yes');
  const [message, setMessage] = useState(''); // To display success or error messages
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Attempting to create an account with email:', email); // Debug log

    try {
      const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response Status:', response.status); // Debug log

      if (response.ok) {
        setMessage('Your account has been created successfully!');
        login(email)
        setEmail('');
        setPassword('');
        setPromo('yes');
        navigate('/schedule')
        console.log('Account created successfully'); // Debug log
      } else if (response.status === 409) {
        setMessage('User already exists. Please log in.');
        console.log('User already exists'); // Debug log
      } else {
        setMessage('An error occurred. Please try again.');
        console.log('An error occurred while creating the account'); // Debug log
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setMessage('Failed to create account. Please check your connection.');
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h2>Create Your Account</h2>
        {message && <div className="alert">{message}</div>}
        <form onSubmit={handleSubmit} className="form-container">
          <div className="mb-4">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="sample@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <fieldset className="mb-4">
            <legend>Agreement</legend>
            <p>Do you want to receive promotional emails?</p>
            <div className="form-check">
              <input
                type="radio"
                id="promo-yes"
                name="promo"
                value="yes"
                checked={promo === 'yes'}
                onChange={() => setPromo('yes')}
                className="form-check-input"
              />
              <label htmlFor="promo-yes" className="form-check-label">Yes</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="promo-no"
                name="promo"
                value="no"
                checked={promo === 'no'}
                onChange={() => setPromo('no')}
                className="form-check-input"
              />
              <label htmlFor="promo-no" className="form-check-label">No</label>
            </div>
          </fieldset>
          <button type="submit" className="btn btn-primary w-100">Create Account</button>
        </form>
        <div className="button-container" style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/login')}>
            Go back to Login Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
