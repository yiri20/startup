import React, { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [promo, setPromo] = useState('yes');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Your account has been created successfully!');
    // Reset form fields after submission
    setEmail('');
    setPassword('');
    setPromo('yes');
  };

  return (
    <div className="signin-page">

      {/* Main Form Section */}
      <main className="container">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="sample@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="button" className="btn btn-secondary mt-2">Verify</button>
          </div>

          <div>
            <label htmlFor="password">Password</label>
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

          <fieldset className="mt-4">
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
      </main>

    </div>
  );
};

export default SignIn;
