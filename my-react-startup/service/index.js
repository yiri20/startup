import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ObjectId } from 'mongodb';
import * as DB from './database.js';
import fetch from 'node-fetch';

// Setup __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const authCookieName = 'token';

// The service port may be set on the command line
const port = process.env.PORT || 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Enable CORS for all routes
app.use(cors());

// Serve up the application's static content
app.use(express.static(path.join(__dirname, '../public'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (await DB.getUser(email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(email, password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await DB.getUser(email);
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Schedules API

// Get all schedules for the authenticated user
secureApiRouter.get('/schedules', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }

  try {
    const schedules = await DB.getSchedules(user.email);
    res.status(200).json({ schedules });
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).send({ msg: 'Failed to fetch schedules' });
  }
});

// Delete a specific schedule for the authenticated user
secureApiRouter.delete('/schedules/:id', async (req, res) => {
  console.log('Delete endpoint hit.');
  const { id } = req.params;
  console.log('Received ID:', id);

  const authToken = req.cookies[authCookieName];
  console.log('Received authToken:', authToken);

  const user = await DB.getUserByToken(authToken);
  if (!user) {
    console.log('User not authorized');
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  if (!ObjectId.isValid(id)) {
    console.log('Invalid ID format');
    return res.status(400).json({ msg: 'Invalid ID format' });
  }

  try {
    console.log('Attempting to delete schedule with ID:', id);
    const result = await DB.deleteDocuments('schedules', { _id: new ObjectId(id), userId: user.email });
    if (result.deletedCount > 0) {
      console.log('Schedule deleted successfully');
      res.status(200).json({ msg: 'Schedule deleted successfully' });
    } else {
      console.log('Schedule not found or unauthorized');
      res.status(404).json({ msg: 'Schedule not found or unauthorized' });
    }
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({ msg: 'Failed to delete schedule', error: error.message });
  }
});

// Add a new schedule for the authenticated user
secureApiRouter.post('/schedules', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }

  const { genre, artist, album, datetime, notification } = req.body;
  if (!genre || !datetime || !artist || !album) {
    return res.status(400).send({ msg: 'All fields are required' });
  }

  const newSchedule = {
    userId: user.email,
    genre,
    artist,
    album,
    datetime,
    notification,
  };

  try {
    const createdSchedule = await DB.addSchedule(newSchedule);
    res.status(201).json(createdSchedule);
  } catch (error) {
    console.error('Error saving schedule:', error);
    res.status(500).send({ msg: 'Failed to save schedule' });
  }
});

// Update a schedule by ID
secureApiRouter.put('/schedules/:id', async (req, res) => {
  const { id } = req.params;
  const updatedSchedule = req.body;

  console.log('Updating schedule with ID:', id); // Debugging log

  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ msg: 'Invalid ID format' });
  }

  try {
    // Update the schedule by ID
    const result = await DB.updateScheduleById(id, updatedSchedule);
    if (result.modifiedCount > 0) {
      res.status(200).send({ msg: 'Schedule updated successfully' });
    } else {
      res.status(404).send({ msg: 'Schedule not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).send({ msg: 'Failed to update schedule' });
  }
});

// Reviews API

// Add a new review for the authenticated user
secureApiRouter.post('/reviews', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }

  const { album, artist, rating, review } = req.body;
  if (!album || !artist || !rating || !review) {
    return res.status(400).send({ msg: 'All fields are required' });
  }

  const newReview = {
    user: user.email,
    album,
    artist,
    rating,
    review,
    date: new Date().toISOString(),
  };

  try {
    const createdReview = await DB.addReview(newReview);
    res.status(201).json(createdReview);
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).send({ msg: 'Failed to save review' });
  }
});

// Get all reviews
apiRouter.get('/reviews', async (req, res) => {
  try {
    const reviews = await DB.getReviews();
    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).send({ msg: 'Failed to fetch reviews' });
  }
});

// Delete a review by ID
secureApiRouter.delete('/reviews/:id', async (req, res) => {
  const reviewId = req.params.id;
  try {
    const result = await DB.deleteReviewById(reviewId);
    if (result.deletedCount > 0) {
      res.status(200).send({ msg: 'Review deleted successfully' });
    } else {
      res.status(404).send({ msg: 'Review not found' });
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).send({ msg: 'Failed to delete review' });
  }
});

// Update a review by ID
secureApiRouter.put('/reviews/:id', async (req, res) => {
  const reviewId = req.params.id;
  const updatedReview = req.body;
  try {
    const result = await DB.updateReviewById(reviewId, updatedReview);
    if (result.modifiedCount > 0) {
      res.status(200).send({ msg: 'Review updated successfully' });
    } else {
      res.status(404).send({ msg: 'Review not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).send({ msg: 'Failed to update review' });
  }
});

// Explore API
apiRouter.get('/explore', async (req, res) => {
  const searchTerm = 'top music'; // Adjust the search term as needed
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=album&limit=10`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch iTunes data');
    }

    const data = await response.json();
    res.status(200).json({ explore: data.results });
  } catch (error) {
    console.error('Error fetching iTunes data:', error);
    res.status(500).json({ msg: 'Failed to fetch iTunes data' });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  console.error('Internal server error:', err);
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Start the server
const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default httpService;
