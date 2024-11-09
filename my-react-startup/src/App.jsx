import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/about';
import Explore from './pages/explore/explore';
import Schedule from './schedule/Schedule';
import Review from './pages/review/review';
import Review1 from './pages/review/Review1';
import Review2 from './pages/review/Review2';
import Review3 from './pages/review/Review3';
import MakeReview from './pages/review/MakeReview';
import Login from './pages/login/LogIn';
import SignIn from './pages/login/SignIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/review" element={<Review />} />
        <Route path="/review1" element={<Review1 />} />
        <Route path="/review2" element={<Review2 />} />
        <Route path="/review3" element={<Review3 />} />
        <Route path="/makereview" element={<MakeReview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
