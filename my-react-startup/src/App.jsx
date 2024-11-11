import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Explore from './pages/explore/Explore';
import Review from './pages/review/Review';
import Review1 from './pages/review/Review1';
import Review2 from './pages/review/Review2';
import Review3 from './pages/review/Review3';
import Schedule from './pages/schedule/Schedule';
import SignIn from './pages/login/SignIn';
import Login from './pages/login/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/review" element={<Review />} />
          <Route path="/review1" element={<Review1 />} />
          <Route path="/review2" element={<Review2 />} />
          <Route path="/review3" element={<Review3 />} />
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
