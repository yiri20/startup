const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.argv[2] || 4000;

app.use(cors());
app.use(express.json()); // For parsing JSON requests

// In-memory data for now (will use a database later)
let users = {};
let reviews = [];
let schedules = [];

// Endpoints
// 1. Fetch all reviews
app.get('/api/reviews', (_req, res) => {
  res.json({ reviews });
});

// 2. Create a new review
app.post('/api/reviews', (req, res) => {
  const { artist, album, track, review, rating, date } = req.body;
  const newReview = { id: uuidv4(), artist, album, track, review, rating, date };
  reviews.push(newReview);
  res.json(newReview);
});

// 3. Fetch all schedules
app.get('/api/schedules', (_req, res) => {
  res.json({ schedules });
});

// 4. Add a new schedule
app.post('/api/schedules', (req, res) => {
  const { genre, date, notification } = req.body;
  const newSchedule = { id: uuidv4(), genre, date, notification };
  schedules.push(newSchedule);
  res.json(newSchedule);
});

// 5. User authentication (register and login)
app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;
  if (users[email]) {
    return res.status(409).json({ message: 'User already exists' });
  }
  const user = { email, password, id: uuidv4() };
  users[email] = user;
  res.json({ id: user.id });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users[email];
  if (user && user.password === password) {
    return res.json({ id: user.id });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

// 6. Serve static frontend files
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
