const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json'); // Import credentials

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

let db;

// Establish connection to MongoDB
(async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('myDatabase'); // Replace 'myDatabase' with the actual database name
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
})();

// Function to get a collection
function getCollection(name) {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db.collection(name);
}

// CRUD Functions

/**
 * Create a new document in the collection
 * @param {string} collectionName - The name of the collection
 * @param {object} document - The document to insert
 * @returns {Promise<object>} The result of the insertion
 */
async function createDocument(collectionName, document) {
  const collection = getCollection(collectionName);
  const result = await collection.insertOne(document);
  return result;
}

/**
 * Read documents from the collection
 * @param {string} collectionName - The name of the collection
 * @param {object} query - The query object
 * @param {object} options - Additional query options (e.g., sort, limit)
 * @returns {Promise<Array>} The matching documents
 */
async function readDocuments(collectionName, query = {}, options = {}) {
  const collection = getCollection(collectionName);
  const cursor = collection.find(query, options);
  return cursor.toArray();
}

/**
 * Update documents in the collection
 * @param {string} collectionName - The name of the collection
 * @param {object} query - The query object to find documents
 * @param {object} update - The update operations (e.g., $set, $unset)
 * @returns {Promise<object>} The result of the update operation
 */
async function updateDocuments(collectionName, query, update) {
  const collection = getCollection(collectionName);
  const result = await collection.updateMany(query, update);
  return result;
}

/**
 * Delete documents from the collection
 * @param {string} collectionName - The name of the collection
 * @param {object} query - The query object to find documents to delete
 * @returns {Promise<object>} The result of the deletion operation
 */
async function deleteDocuments(collectionName, query) {
  const collection = getCollection(collectionName);
  const result = await collection.deleteMany(query);
  return result;
}

module.exports = {
  createDocument,
  readDocuments,
  updateDocuments,
  deleteDocuments,
};
