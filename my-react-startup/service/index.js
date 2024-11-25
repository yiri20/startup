// Import required modules
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

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

  try {
    // Check if user already exists
    const existingUser = await DB.getUser(email);
    if (existingUser) {
      console.log(`User already exists with email: ${email}`);
      return res.status(409).json({ message: 'User already exists. Please log in.' });
    }

    // Create new user
    const user = await DB.createUser(email, password);
    console.log(`User created with ID: ${user._id}`);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.status(201).json({ id: user._id });
  } catch (error) {
    console.error('Error during user creation:', error);
    res.status(500).json({ message: 'An error occurred during user creation. Please try again.' });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await DB.getUser(email);
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred during login. Please try again.' });
  }
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
  try {
    const user = await DB.getUserByToken(authToken);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error verifying user token:', error);
    res.status(500).send({ message: 'Failed to verify authentication.' });
  }
});

// Reviews Endpoint
secureApiRouter.get('/reviews', async (_req, res) => {
  try {
    const reviews = await DB.getReviews();
    res.send(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).send({ message: 'Failed to fetch reviews.' });
  }
});

// Submit Review Endpoint
secureApiRouter.post('/reviews', async (req, res) => {
  const review = { ...req.body, ip: req.ip };
  if (!review.album || !review.artist || !review.rating || !review.review) {
    return res.status(400).send({ message: 'All review fields are required' });
  }
  try {
    await DB.addReview(review);
    res.status(201).send({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).send({ message: 'Failed to submit review.' });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  console.error('Internal server error:', err);
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../index.html')); // Make sure this path is correct for serving your root-level index.html
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
