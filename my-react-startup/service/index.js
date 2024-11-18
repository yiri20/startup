const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.argv[2] || 4000;

app.use(cors());
app.use(express.json()); // For parsing JSON requests

// In-memory data for now (will use a database later)
let reviews = [
  {
    id: uuidv4(),
    album: 'The Bends',
    artist: 'Radiohead',
    rating: 4.5,
    review: 'A timeless classic with deep emotional resonance.',
    date: '2024-08-20',
  },
  {
    id: uuidv4(),
    album: 'In Rainbows',
    artist: 'Radiohead',
    rating: 4.8,
    review: 'A beautiful blend of electronic and rock sounds.',
    date: '2024-09-02',
  },
  {
    id: uuidv4(),
    album: 'OK Computer',
    artist: 'Radiohead',
    rating: 5.0,
    review: 'A groundbreaking album that defined a generation.',
    date: '2024-10-04',
  }
];
let schedules = [];
let users = {};

// API Endpoints
// --- Reviews ---
app.get('/api/reviews', (_req, res) => {
  res.json({ reviews });
});

app.post('/api/reviews', (req, res) => {
  const { album, artist, rating, review, date } = req.body;

  if (!album || !artist || !rating || !review) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newReview = {
    id: uuidv4(),
    album,
    artist,
    rating,
    review,
    date: date || new Date().toLocaleDateString(),
  };

  reviews.push(newReview);
  res.json(newReview);
});

// --- Schedules ---
app.get('/api/schedules', (_req, res) => {
  res.json({ schedules });
});

app.post('/api/schedules', (req, res) => {
  const { genre, date, notification } = req.body;

  if (!genre || !date) {
    return res.status(400).json({ message: 'Genre and date are required' });
  }

  const newSchedule = {
    id: uuidv4(),
    genre,
    date,
    notification: notification || false,
  };

  schedules.push(newSchedule);
  res.json(newSchedule);
});

// --- Authentication ---
app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (users[email]) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const newUser = { id: uuidv4(), email, password };
  users[email] = newUser;
  res.json({ id: newUser.id, email: newUser.email });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = users[email];
  if (user && user.password === password) {
    return res.json({ id: user.id, email: user.email });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

// Serve static frontend files
app.use(express.static('public'));

// Fallback for undefined routes
app.use((_req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
