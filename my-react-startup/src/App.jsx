import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Explore from './pages/explore/Explore';
import Review from './pages/review/Review';
import Schedule from './pages/schedule/Schedule';
import SignIn from './pages/login/SignIn';
import Login from './pages/login/login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <Router>
      {/* Navbar appears on all pages */}
      <Navbar />
      
      {/* Main content area */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/review" element={<Review />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      
      {/* Footer appears on all pages */}
      <Footer />
    </Router>
  );
}

export default App;
