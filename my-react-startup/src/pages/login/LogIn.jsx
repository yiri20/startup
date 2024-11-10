import React from 'react';
import './login.css';

function Login() {
  return (
    <>
      {/* Main Login Form Section */}
      <main className="container my-5">
        <h2>Login to Your Account</h2>
        <form className="container">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="sample@email.com"
              required
              aria-label="Email Address"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="password"
              required
              aria-label="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" aria-label="Login Button">
            Login
          </button>
          <div>
            <a href="signin">If you don't have an account, sign up here</a>
          </div>
        </form>
      </main>
    </>
  );
}

export default Login;
