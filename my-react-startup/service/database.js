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
    db = client.db('plan_your_music');
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
  const users = await readDocuments('users', { email });
  return users[0];
}

async function getUserByToken(token) {
  const users = await readDocuments('users', { token });
  return users[0];
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await createDocument('users', user);
  return user;
}

module.exports = {
  createDocument,
  readDocuments,
  updateDocuments,
  deleteDocuments,
  getUser,
  getUserByToken,
  createUser,
};
