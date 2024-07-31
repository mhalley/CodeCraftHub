const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');

// Create an instance of the Express application
const app = express();

// Connect to MongoDB
/**
 * Connects to the MongoDB database using the `connectDB` function.
 * This function establishes a connection to MongoDB, enabling the application to perform database operations.
 * 
 * @function connectDB
 * @example
 * // Initiates the connection to MongoDB
 * connectDB();
 */
connectDB();

// Middleware
/**
 * Configures middleware for the Express application.
 * - `express.json()`: Parses incoming requests with JSON payloads. This middleware is used to automatically parse and convert JSON formatted request bodies into JavaScript objects.
 * 
 * @function express.json
 * @example
 * // Parses incoming JSON request bodies
 * app.use(express.json());
 */
app.use(express.json());

// Routes
/**
 * Configures the routing for the Express application.
 * - `/users`: Routes related to user operations are handled by `userRoutes`.
 * 
 * @function app.use
 * @param {String} '/users' - The base path for user-related routes.
 * @param {Router} userRoutes - The router that handles user-related endpoints.
 * @example
 * // Sets up routes for user-related operations
 * app.use('/users', userRoutes);
 */
app.use('/users', userRoutes);

// Start the server
/**
 * Starts the Express server and listens for incoming connections on the specified port.
 * - `port`: The port number on which the server listens. In this case, it's set to `3000`.
 * - Logs a message to the console indicating that the server has started and is listening on the specified port.
 * 
 * @function app.listen
 * @param {Number} port - The port number on which the server will listen.
 * @param {Function} callback - A callback function that is called once the server starts listening.
 * @example
 * // Start the server on port 3000
 * app.listen(3000, () => {
 *   console.log(`Server started on port 3000`);
 * });
 */
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});