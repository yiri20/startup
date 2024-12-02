import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Check if the MONGODB_URI is properly loaded
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("DB_NAME:", process.env.DB_NAME);

// MongoDB connection setup
let db;

const url = process.env.MONGODB_URI;
if (!url) {
  console.error("MONGODB_URI is not defined. Please check your .env file.");
  process.exit(1);
}

// Updated MongoClient initialization with additional options
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000, autoSelectFamily: false, });

// Function to connect to MongoDB
async function connectDB() {
  if (db) return db;

  try {
    console.log('Attempting to connect to MongoDB...');
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }

  return db;
}

// Get collection helper function
async function getCollection(name) {
  const database = await connectDB();
  return database.collection(name);
}

// Create a new user
export async function createUser(email, password) {
  const collection = await getCollection('users');
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, password: hashedPassword, token: generateToken() };
  const result = await collection.insertOne(newUser);
  console.log('User created with ID:', result.insertedId);
  return await collection.findOne({ _id: result.insertedId });
}

// Get a user by email
export async function getUser(email) {
  const collection = await getCollection('users');
  return await collection.findOne({ email });
}

// Get a user by token
export async function getUserByToken(token) {
  const collection = await getCollection('users');
  return await collection.findOne({ token });
}

// Add a new review
export async function addReview(review) {
  if (!review || !review.album || !review.artist || !review.rating || !review.review) {
    throw new Error('Invalid review object');
  }
  const collection = await getCollection('reviews');
  const result = await collection.insertOne(review);
  console.log('Review created with ID:', result.insertedId);
  return await collection.findOne({ _id: result.insertedId });
}

// Get all reviews
export async function getReviews() {
  const collection = await getCollection('reviews');
  return await collection.find({}).toArray();
}

// Delete a review by ID
export async function deleteReviewById(reviewId) {
  try {
    console.log("Attempting to delete review with ID:", reviewId);
    if (!ObjectId.isValid(reviewId)) {
      throw new Error("Invalid reviewId");
    }
    const collection = await getCollection('reviews');
    const result = await collection.deleteOne({ _id: new ObjectId(reviewId) });
    console.log("Delete result:", result);
    return result;
  } catch (error) {
    console.error("Error in deleteReviewById:", error);
    throw error;
  }
}

// Update a review by ID
export async function updateReviewById(reviewId, updatedReview) {
  try {
    console.log("Attempting to update review with ID:", reviewId);
    if (!ObjectId.isValid(reviewId)) {
      throw new Error("Invalid reviewId");
    }
    const collection = await getCollection('reviews');
    const result = await collection.updateOne(
      { _id: new ObjectId(reviewId) },
      { $set: updatedReview }
    );
    console.log("Update result:", result);
    return result;
  } catch (error) {
    console.error("Error in updateReviewById:", error);
    throw error;
  }
}

// Add a new schedule
export async function addSchedule(schedule) {
  if (!schedule || !schedule.userId || !schedule.genre || !schedule.datetime) {
    throw new Error('Invalid schedule object');
  }
  const collection = await getCollection('schedules');
  const result = await collection.insertOne(schedule);
  console.log('Schedule created with ID:', result.insertedId);
  return await collection.findOne({ _id: result.insertedId });
}

// Get schedules by user email
export async function getSchedules(email) {
  const collection = await getCollection('schedules');
  return await collection.find({ userId: email }).toArray();
}

// Delete documents from a specified collection
export async function deleteDocuments(collectionName, filter) {
  try {
    const collection = await getCollection(collectionName);
    const result = await collection.deleteOne(filter);
    console.log('Deleted document:', result);
    return result;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}

// Update a schedule by ID
export async function updateScheduleById(scheduleId, updatedSchedule) {
  try {
    console.log("Attempting to update schedule with ID:", scheduleId);
    if (!ObjectId.isValid(scheduleId)) {
      throw new Error("Invalid scheduleId");
    }
    const collection = await getCollection('schedules'); 
    const result = await collection.updateOne(
      { _id: new ObjectId(scheduleId) },
      { $set: updatedSchedule }
    );
    console.log("Update result:", result);
    return result;
  } catch (error) {
    console.error("Error in updateScheduleById:", error);
    throw error;
  }
}

// Add explore data
export async function addExploreData(data) {
  if (!data || !data.title || !data.artist || !data.image || !data.description) {
    throw new Error('Invalid explore data object');
  }
  const collection = await getCollection('explore');
  const result = await collection.insertOne(data);
  console.log('Explore data created with ID:', result.insertedId);
  return await collection.findOne({ _id: result.insertedId });
}

// Get explore data
export async function getExploreData() {
  const collection = await getCollection('explore');
  return await collection.find({}).toArray();
}

// Helper function to generate a token
function generateToken() {
  return uuidv4();
}
