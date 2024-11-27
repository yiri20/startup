import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
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
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import './styles/App.css';

function AppWithRouter() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  // Fetch reviews from the backend
  useEffect(() => {
    fetch('/api/reviews', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        return response.json();
      })
      .then((data) => setReviews(data.reviews || []))
      .catch((err) => console.error('Failed to fetch reviews:', err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/review" element={<Review reviews={reviews} />} />
          <Route path="/review/:id" element={<ReviewDetail reviews={reviews} />} />
          <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppWithRouter />
      </Router>
    </AuthProvider>
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
