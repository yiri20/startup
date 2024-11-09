import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './about/About';
import Schedule from './schedule/Schedule';
import Explore from './explore/Explore';
import Review from './review/Review';
import Review1 from './review/Review1';
import Review2 from './review/Review2';
import Review3 from './review/Review3';
import MakeReview from './review/MakeReview';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/review" element={<Review />} />
        <Route path="/review1" element={<Review1 />} />
        <Route path="/review2" element={<Review2 />} />
        <Route path="/review3" element={<Review3 />} />
        <Route path="/makereview" element={<MakeReview />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
