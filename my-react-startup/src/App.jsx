import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Explore from './pages/explore/Explore';
import Review from './pages/review/Review';
import ReviewDetail from './pages/review/ReviewDetail';
import Schedule from './pages/schedule/Schedule';
import SignIn from './pages/login/SignIn';
import Login from './pages/login/LogIn';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from the backend
  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews || []))
      .catch((err) => console.error('Failed to fetch reviews:', err));
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/review" element={<Review reviews={reviews} />} />
          <Route path="/review/:id" element={<ReviewDetail reviews={reviews} />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

function NotFound() {
  return (
    <div className="container text-center" style={{ marginTop: '50px' }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default App;
