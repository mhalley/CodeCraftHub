const mongoose = require('mongoose');
const User = require('../models/userModel');

// Function to connect to MongoDB
/**
 * Connects to the MongoDB database using Mongoose.
 * - Attempts to connect to the MongoDB server using the provided connection string.
 * - Logs a success message if the connection is established.
 * - Logs an error message and exits the process if the connection fails.
 * 
 * @async
 * @function connectDB
 * @throws Will exit the process with a non-zero status code if the connection fails.
 * @example
 * // Example usage
 * connectDB();
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string
    await mongoose.connect('mongodb://root:MTA3NzItbWFyZ3Vl@localhost:27017/margueriteeh?authSource=admin');
    // Log a success message upon successful connection
    console.log('MongoDB connected');
  } catch (error) {
    // Log an error message if the connection fails
    console.error('MongoDB connection error:', error);
    // Exit the process with a failure code
    process.exit(1);
  }
};

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;