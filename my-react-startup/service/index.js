import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';
import { ObjectId } from 'mongodb';
import * as DB from './database.js';
import fetch from 'node-fetch';

// Setup __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration settings
const config = {
  mongoURI: 'mongodb+srv://yiri20:qowjddlf98@cs260.nycqv.mongodb.net/plan_your_music?retryWrites=true&w=majority', // Replace with your MongoDB URI
  port: 4000, // Default port for the server
};

// Log configuration settings
console.log('__dirname:', __dirname);
console.log('MongoDB URI:', config.mongoURI);

const app = express();
const authCookieName = 'token';

// The service port may be set on the command line
const port = process.env.PORT || config.port;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Enable CORS for all routes
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  },
}));

// Trust headers that are forwarded from the proxy
app.set('trust proxy', true);

// Router for service endpoints
const apiRouter = express.Router();
app.use('/api', apiRouter);

// WebSocket Setup
const server = app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  ws.on('message', (message) => {
    console.log('Received:', message);
    // Broadcast the received message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// Authentication Routes

// Create a new user
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (await DB.getUser(email)) {
    return res.status(409).send({ message: 'User already exists' });
  }

  const user = await DB.createUser(email, password);
  setAuthCookie(res, user.token);
  res.status(201).send({ id: user._id });
});

// Log in user and create an authentication token
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await DB.getUser(email);
  if (user && await bcrypt.compare(password, user.password)) {
    setAuthCookie(res, user.token);
    res.send({ id: user._id });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

// Log out user by clearing the authentication token
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify authentication
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
});

// Schedule Routes

// Get all schedules for the authenticated user
secureApiRouter.get('/schedules', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user) return res.status(401).send({ message: 'Unauthorized' });

  try {
    const schedules = await DB.getSchedules(user.email);
    res.status(200).json({ schedules });
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).send({ message: 'Failed to fetch schedules' });
  }
});

// Add a new schedule
secureApiRouter.post('/schedules', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user) return res.status(401).send({ message: 'Unauthorized' });

  const { genre, artist, album, datetime, notification } = req.body;
  if (!genre || !artist || !album || !datetime) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  const newSchedule = { userId: user.email, genre, artist, album, datetime, notification };
  try {
    const createdSchedule = await DB.addSchedule(newSchedule);
    res.status(201).json(createdSchedule);
  } catch (error) {
    console.error('Error saving schedule:', error);
    res.status(500).send({ message: 'Failed to save schedule' });
  }
});

// Update a schedule by ID
secureApiRouter.put('/schedules/:id', async (req, res) => {
  const { id } = req.params;
  const updatedSchedule = req.body;

  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user) return res.status(401).send({ message: 'Unauthorized' });

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid ID format' });
  }

  try {
    const result = await DB.updateScheduleById(id, updatedSchedule);
    if (result.modifiedCount > 0) {
      res.status(200).send({ message: 'Schedule updated successfully' });
    } else {
      res.status(404).send({ message: 'Schedule not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).send({ message: 'Failed to update schedule' });
  }
});

// Delete a schedule by ID
secureApiRouter.delete('/schedules/:id', async (req, res) => {
  const { id } = req.params;

  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user) return res.status(401).send({ message: 'Unauthorized' });

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid ID format' });
  }

  try {
    const result = await DB.deleteDocuments('schedules', { _id: new ObjectId(id), userId: user.email });
    if (result.deletedCount > 0) {
      res.status(200).send({ message: 'Schedule deleted successfully' });
    } else {
      res.status(404).send({ message: 'Schedule not found or unauthorized' });
    }
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).send({ message: 'Failed to delete schedule' });
  }
});

// Reviews Routes

// Add a new review
secureApiRouter.post('/reviews', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user) return res.status(401).send({ message: 'Unauthorized' });

  const { album, artist, rating, review } = req.body;
  if (!album || !artist || !rating || !review) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  const newReview = { user: user.email, album, artist, rating, review, date: new Date().toISOString() };
  try {
    const createdReview = await DB.addReview(newReview);
    res.status(201).json(createdReview);
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).send({ message: 'Failed to save review' });
  }
});

// Get all reviews
apiRouter.get('/reviews', async (_req, res) => {
  try {
    const reviews = await DB.getReviews();
    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).send({ message: 'Failed to fetch reviews' });
  }
});

// Delete a review by ID
secureApiRouter.delete('/reviews/:id', async (req, res) => {
  const reviewId = req.params.id;
  try {
    const result = await DB.deleteReviewById(reviewId);
    if (result.deletedCount > 0) {
      res.status(200).send({ message: 'Review deleted successfully' });
    } else {
      res.status(404).send({ message: 'Review not found' });
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).send({ message: 'Failed to delete review' });
  }
});

// Explore API
apiRouter.get('/explore', async (_req, res) => {
  const searchTerm = 'top music';
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=album&limit=10`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch iTunes data');

    const data = await response.json();
    res.status(200).json({ explore: data.results });
  } catch (error) {
    console.error('Error fetching iTunes data:', error);
    res.status(500).json({ message: 'Failed to fetch iTunes data' });
  }
});

// Default error handler
app.use((err, _req, res, _next) => {
  console.error('Internal server error:', err);
  res.status(500).send({ type: err.name, message: err.message });
});

// Default page handler
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Set the authentication cookie
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Start the server
app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
