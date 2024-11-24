// Import required modules
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Debug: Log environment variables
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Set up Express app
const app = express();
const port = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
(async function connectToDatabase() {
  try {
    console.log('Connecting to MongoDB with URI:', process.env.MONGODB_URI); // Debug log
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
})();

// Define Mongoose models
const reviewSchema = new mongoose.Schema({
  album: { type: String, required: true },
  artist: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  date: { type: String, required: true },
});
const Review = mongoose.model('Review', reviewSchema);

const scheduleSchema = new mongoose.Schema({
  genre: { type: String, required: true },
  datetime: { type: String, required: true },
  notification: { type: Boolean, required: true },
});
const Schedule = mongoose.model('Schedule', scheduleSchema);

// Authentication Endpoints
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists. Please log in.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ id: newUser._id, email: newUser.email });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials. Please try again.' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials. Please try again.' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  // Since JWT is stateless, the frontend can simply remove the token.
  // Alternatively, you could keep track of blacklisted tokens to prevent misuse.
  res.status(200).json({ message: 'Logout successful' });
});

// Middleware to authenticate JWT tokens
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing or invalid' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Reviews Endpoints
app.get('/api/reviews', async (_req, res) => {
  try {
    const reviews = await Review.find();
    res.json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Failed to fetch reviews.' });
  }
});

app.post('/api/reviews', authenticateToken, async (req, res) => {
  const { album, artist, rating, review } = req.body;

  if (!album || !artist || !rating || !review) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newReview = new Review({
      album,
      artist,
      rating,
      review,
      date: new Date().toLocaleDateString(),
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Failed to create review.' });
  }
});

// Schedules Endpoints
app.get('/api/schedules', async (_req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json({ schedules });
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ message: 'Failed to fetch schedules.' });
  }
});

app.post('/api/schedules', authenticateToken, async (req, res) => {
  const { genre, datetime, notification } = req.body;

  if (!genre || !datetime) {
    return res.status(400).json({ message: 'Genre and datetime are required' });
  }

  try {
    const newSchedule = new Schedule({
      genre,
      datetime,
      notification,
    });
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).json({ message: 'Failed to create schedule.' });
  }
});

app.delete('/api/schedules/:id', authenticateToken, async (req, res) => {
  try {
    const result = await Schedule.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json({ message: 'Schedule deleted' });
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({ message: 'Failed to delete schedule.' });
  }
});

// Explore Endpoint using iTunes API
app.get('/api/explore', async (_req, res) => {
  try {
    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term: 'music',
        entity: 'album',
        limit: 10,
      },
    });
    const albums = response.data.results.map((album) => ({
      id: album.collectionId,
      title: album.collectionName,
      artist: album.artistName,
      image: album.artworkUrl100,
      description: `Released: ${new Date(album.releaseDate).toLocaleDateString()}`,
    }));
    res.json({ explore: albums });
  } catch (error) {
    console.error('Error fetching data from iTunes API:', error.message);
    res.status(500).json({ message: 'Failed to fetch explore data.' });
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
