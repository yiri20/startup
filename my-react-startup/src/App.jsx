// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Review from './review/review';
import Review1 from './review/Review1';
import Review2 from './review/Review2';
import Review3 from './review/Review3';
import MakeReview from './review/MakeReview';
import Explore from './explore/explore';
import About from './about/about';
import Login from './login/login';
import SignIn from './login/SignIn';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Review />} />
        <Route path="/review1" element={<Review1 />} />
        <Route path="/review2" element={<Review2 />} />
        <Route path="/review3" element={<Review3 />} />
        <Route path="/makereview" element={<MakeReview />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}
