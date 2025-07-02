import mongoose from "mongoose";

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI!;

// Ensure the environment variable is set
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

// Global variable to hold the MongoDB connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Function to connect to MongoDB
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Adjust the pool size as needed
      // serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if no server is available
      // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    mongoose.connect(MONGODB_URI, opts).then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }

  return cached.conn;
}
