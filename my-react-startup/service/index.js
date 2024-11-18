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

// Path to the data file
const DATA_FILE = path.join(__dirname, 'data.json');

// Helper function to load data from the JSON file
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
    return { reviews: [] };
  } catch (err) {
    console.error('Error reading data file:', err);
    return { reviews: [] };
  }
}

// Helper function to save data to the JSON file
function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing data file:', err);
  }
}

// Load initial data
let { reviews } = loadData();
let schedules = [];

// In-memory data for explore (can later use a database or external API)
const exploreData = [
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
];

// Endpoints

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
  saveData({ reviews });
  res.status(201).json(newReview);
});

// Schedules Endpoints
app.get('/api/schedules', (_req, res) => {
  res.json({ schedules });
});

app.post('/api/schedules', (req, res) => {
  const { genre, date, notification } = req.body;
  const newSchedule = {
    id: uuidv4(),
    genre,
    date,
    notification,
  };
  schedules.push(newSchedule);
  res.json(newSchedule);
});

app.delete('/api/schedules/:id', (req, res) => {
  const scheduleIndex = schedules.findIndex((s) => s.id === req.params.id);
  if (scheduleIndex !== -1) {
    schedules.splice(scheduleIndex, 1);
    res.json({ message: 'Schedule deleted' });
  } else {
    res.status(404).json({ message: 'Schedule not found' });
  }
});

// Explore Endpoints
app.get('/api/explore', (_req, res) => {
  res.json({ explore: exploreData });
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
