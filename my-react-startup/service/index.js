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

// Endpoints

// 1. Fetch all reviews
app.get('/api/reviews', (_req, res) => {
  res.json({ reviews });
});

// 2. Fetch a single review by ID
app.get('/api/reviews/:id', (req, res) => {
  const review = reviews.find((r) => r.id === req.params.id);
  if (review) {
    res.json(review);
  } else {
    res.status(404).json({ message: 'Review not found' });
  }
});

// 3. Create a new review
app.post('/api/reviews', (req, res) => {
  const { album, artist, track, review, rating } = req.body;
  const newReview = {
    id: uuidv4(),
    album,
    artist,
    track,
    review,
    rating,
    date: new Date().toLocaleDateString(),
  };

  reviews.push(newReview);
  saveData({ reviews }); // Save the updated reviews to the JSON file
  res.json(newReview);
});

// 4. Serve static frontend files
app.use(express.static('public'));

// Catch-all handler to serve index.html for React Router paths
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
