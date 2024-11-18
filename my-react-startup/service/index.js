const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.argv[2] || 4000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON requests

// Paths for data files
const DATA_FILE = path.join(__dirname, 'data.json');
const EXPLORE_FILE = path.join(__dirname, 'explore.json');

// Helper function to load data from JSON file
function loadData(filePath, fallbackData = []) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
    return fallbackData;
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return fallbackData;
  }
}

// Helper function to save data to JSON file
function saveData(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Error writing to ${filePath}:`, err);
  }
}

// Load initial data
let { reviews } = loadData(DATA_FILE, { reviews: [] });
let schedules = loadData(DATA_FILE).schedules || [];
let exploreData = loadData(EXPLORE_FILE, [
  {
    id: '1',
    title: 'OK Computer',
    artist: 'Radiohead',
    image: 'https://via.placeholder.com/150',
    description: 'A groundbreaking album with timeless tracks.',
  },
  {
    id: '2',
    title: 'The Bends',
    artist: 'Radiohead',
    image: 'https://via.placeholder.com/150',
    description: 'A soulful, emotional classic.',
  },
  {
    id: '3',
    title: 'In Rainbows',
    artist: 'Radiohead',
    image: 'https://via.placeholder.com/150',
    description: 'A beautiful mix of electronic and rock elements.',
  },
]);

// User data for authentication
let users = {};

// Authentication Endpoints
app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (users[email]) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const user = {
    id: uuidv4(),
    email,
    password, // In production, use hashed passwords!
  };

  users[email] = user;
  res.status(201).json({ id: user.id, email: user.email });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = users[email];

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({ id: user.id, email: user.email });
});

// Reviews Endpoints
app.get('/api/reviews', (_req, res) => {
  res.json({ reviews });
});

app.get('/api/reviews/:id', (req, res) => {
  const review = reviews.find((r) => r.id === req.params.id);
  if (review) {
    res.json(review);
  } else {
    res.status(404).json({ message: 'Review not found' });
  }
});

app.post('/api/reviews', (req, res) => {
  const { album, artist, track, review, rating } = req.body;

  if (!album || !artist || !review || !rating) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newReview = {
    id: uuidv4(),
    album,
    artist,
    track: track || 'N/A', // Optional field
    review,
    rating,
    date: new Date().toLocaleDateString(),
  };

  reviews.push(newReview);
  saveData(DATA_FILE, { reviews, schedules }); // Save the updated reviews to the JSON file
  res.status(201).json(newReview);
});

// Schedules Endpoints
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
    notification,
  };

  schedules.push(newSchedule);
  saveData(DATA_FILE, { reviews, schedules }); // Save updated schedules
  res.status(201).json(newSchedule);
});

app.delete('/api/schedules/:id', (req, res) => {
  const scheduleIndex = schedules.findIndex((s) => s.id === req.params.id);
  if (scheduleIndex !== -1) {
    schedules.splice(scheduleIndex, 1);
    saveData(DATA_FILE, { reviews, schedules }); // Save updated schedules
    res.json({ message: 'Schedule deleted' });
  } else {
    res.status(404).json({ message: 'Schedule not found' });
  }
});

// Explore Endpoints
app.get('/api/explore', (_req, res) => {
  res.json({ explore: exploreData });
});

app.post('/api/explore', (req, res) => {
  const { title, artist, image, description } = req.body;

  if (!title || !artist || !description) {
    return res.status(400).json({ message: 'Title, artist, and description are required' });
  }

  const newExploreItem = {
    id: uuidv4(),
    title,
    artist,
    image: image || 'https://via.placeholder.com/150', // Default image if not provided
    description,
  };

  exploreData.push(newExploreItem);
  saveData(EXPLORE_FILE, exploreData); // Save updated explore data
  res.status(201).json(newExploreItem);
});

app.delete('/api/explore/:id', (req, res) => {
  const exploreIndex = exploreData.findIndex((item) => item.id === req.params.id);
  if (exploreIndex !== -1) {
    exploreData.splice(exploreIndex, 1);
    saveData(EXPLORE_FILE, exploreData); // Save updated explore data
    res.json({ message: 'Explore item deleted' });
  } else {
    res.status(404).json({ message: 'Explore item not found' });
  }
});

// Serve static frontend files
app.use(express.static('public'));

// Catch-all handler for React Router paths
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
