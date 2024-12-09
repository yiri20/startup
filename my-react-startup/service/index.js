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
  mongoURI: 'your_mongo_connection_string', // Replace with your MongoDB URI
  port: 4000,
};

// Log configuration settings
console.log('__dirname:', __dirname);
console.log('MongoDB URI:', config.mongoURI);

const app = express();
const authCookieName = 'token';

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    },
  })
);

// Trust proxy headers
app.set('trust proxy', true);

// WebSocket setup
const server = app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  ws.on('message', (message) => {
    console.log('Received WebSocket message:', message);
    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(`Server: ${message}`);
      }
    });
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// API Router
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Authentication Routes
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

apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await DB.getUser(email);
  if (user && (await bcrypt.compare(password, user.password))) {
    setAuthCookie(res, user.token);
    res.send({ id: user._id });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

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

// WebSocket Test Endpoint
apiRouter.post('/websocket-test', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  wss.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send(`Broadcast: ${message}`);
    }
  });

  res.status(200).json({ message: 'Message broadcasted successfully' });
});

// Set authentication cookie
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Default error handler
app.use((err, _req, res, _next) => {
  console.error('Internal server error:', err);
  res.status(500).send({ type: err.name, message: err.message });
});

// Default page handler
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
