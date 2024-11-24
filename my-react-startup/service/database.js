const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

let db;

// Establish connection to MongoDB
(async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('plan_your_music'); // Replace 'plan_your_music' with the actual database name
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
})();

// Generic CRUD Functions
function getCollection(name) {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db.collection(name);
}

async function createDocument(collectionName, document) {
  const collection = getCollection(collectionName);
  const result = await collection.insertOne(document);
  return result;
}

async function readDocuments(collectionName, query = {}, options = {}) {
  const collection = getCollection(collectionName);
  const cursor = collection.find(query, options);
  return cursor.toArray();
}

async function updateDocuments(collectionName, query, update) {
  const collection = getCollection(collectionName);
  const result = await collection.updateMany(query, update);
  return result;
}

async function deleteDocuments(collectionName, query) {
  const collection = getCollection(collectionName);
  const result = await collection.deleteMany(query);
  return result;
}

// Specific Methods for "Plan Your Music" Application
async function getUser(email) {
  return await readDocuments('user', { email });
}

async function getUserByToken(token) {
  return await readDocuments('user', { token });
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email,
    password: passwordHash,
    token: uuid.v4(),
  };
  const result = await createDocument('user', user);
  return result.ops[0]; // Returning the newly created user
}

async function addSchedule(schedule) {
  if (!schedule || !schedule.userId || !schedule.genre || !schedule.datetime) {
    throw new Error('Invalid schedule object');
  }
  return await createDocument('schedule', schedule);
}

async function getSchedules(userId) {
  return await readDocuments('schedule', { userId });
}

async function addReview(review) {
  if (!review || !review.album || !review.artist || !review.rating || !review.review) {
    throw new Error('Invalid review object');
  }
  return await createDocument('review', review);
}

async function getReviews(albumId) {
  return await readDocuments('review', { album: albumId });
}

module.exports = {
  createDocument,
  readDocuments,
  updateDocuments,
  deleteDocuments,
  getUser,
  getUserByToken,
  createUser,
  addSchedule,
  getSchedules,
  addReview,
  getReviews,
};
