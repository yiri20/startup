import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// Hardcoded MongoDB configuration
const MONGODB_URI = 'mongodb+srv://yiri20:qowjddlf98@cs260.nycqv.mongodb.net/plan_your_music?retryWrites=true&w=majority'; // Replace with your actual MongoDB URI
const DB_NAME = 'plan_your_music'; // Replace with your actual database name

// MongoDB connection setup
let db;
const client = new MongoClient(MONGODB_URI, {
  serverSelectionTimeoutMS: 3000, // Connection timeout
});

// Function to connect to MongoDB
async function connectDB() {
  if (db) return db;

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    db = client.db(DB_NAME);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit if connection fails
  }

  return db;
}

// Helper function to get a collection
async function getCollection(name) {
  const database = await connectDB();
  return database.collection(name);
}

// User Functions
export async function createUser(email, password) {
  const collection = await getCollection('users');
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, password: hashedPassword, token: generateToken() };
  const result = await collection.insertOne(newUser);
  console.log('User created with ID:', result.insertedId);
  return await collection.findOne({ _id: result.insertedId });
}

export async function getUser(email) {
  const collection = await getCollection('users');
  return await collection.findOne({ email });
}

export async function getUserByToken(token) {
  const collection = await getCollection('users');
  return await collection.findOne({ token });
}

// Review Functions
export async function addReview(review) {
  if (!review || !review.album || !review.artist || !review.rating || !review.review) {
    throw new Error('Invalid review object');
  }
  const collection = await getCollection('reviews');
  const result = await collection.insertOne(review);
  console.log('Review created with ID:', result.insertedId);
  return await collection.findOne({ _id: result.insertedId });
}

export async function getReviews() {
  const collection = await getCollection('reviews');
  return await collection.find({}).toArray();
}

export async function deleteReviewById(reviewId) {
  if (!ObjectId.isValid(reviewId)) {
    throw new Error('Invalid review ID');
  }
  const collection = await getCollection('reviews');
  return await collection.deleteOne({ _id: new ObjectId(reviewId) });
}

export async function updateReviewById(reviewId, updatedReview) {
  if (!ObjectId.isValid(reviewId)) {
    throw new Error('Invalid review ID');
  }
  const collection = await getCollection('reviews');
  return await collection.updateOne(
    { _id: new ObjectId(reviewId) },
    { $set: updatedReview }
  );
}

// Schedule Functions
export async function addSchedule(schedule) {
  if (!schedule || !schedule.userId || !schedule.genre || !schedule.datetime) {
    throw new Error('Invalid schedule object');
  }
  const collection = await getCollection('schedules');
  const result = await collection.insertOne(schedule);
  console.log('Schedule created with ID:', result.insertedId);
  return await collection.findOne({ _id: result.insertedId });
}

export async function getSchedules(email) {
  const collection = await getCollection('schedules');
  return await collection.find({ userId: email }).toArray();
}

export async function deleteDocuments(collectionName, filter) {
  const collection = await getCollection(collectionName);
  return await collection.deleteOne(filter);
}

export async function updateScheduleById(scheduleId, updatedSchedule) {
  if (!ObjectId.isValid(scheduleId)) {
    throw new Error('Invalid schedule ID');
  }
  const collection = await getCollection('schedules');
  return await collection.updateOne(
    { _id: new ObjectId(scheduleId) },
    { $set: updatedSchedule }
  );
}

// Explore Functions
export async function addExploreData(data) {
  if (!data || !data.title || !data.artist || !data.image || !data.description) {
    throw new Error('Invalid explore data object');
  }
  const collection = await getCollection('explore');
  const result = await collection.insertOne(data);
  console.log('Explore data created with ID:', result.insertedId);
  return await collection.findOne({ _id: result.insertedId });
}

export async function getExploreData() {
  const collection = await getCollection('explore');
  return await collection.find({}).toArray();
}

// Helper Function to Generate a Token
function generateToken() {
  return uuidv4();
}