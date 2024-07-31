const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
/**
 * Registers a new user.
 * - Checks if the username already exists.
 * - Hashes the password and saves the user to the database.
 * - Responds with a success message or an error message.
 * @param {Object} req - The request object containing user details.
 * @param {Object} res - The response object.
 */
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// User login
/**
 * Logs in a user.
 * - Checks if the username exists.
 * - Verifies the password.
 * - Generates a JWT token if login is successful.
 * - Responds with a token or an error message.
 * @param {Object} req - The request object containing user credentials.
 * @param {Object} res - The response object.
 */
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JSON Web Token (JWT)
    const token = jwt.sign({ username: existingUser.username }, '3521cde9608cb865a12b1ce276c7860588b988e5f82f0b5b2ce1f48636b4473d', { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// User profile management
/**
 * Updates the user's profile.
 * - Updates the username of an existing user.
 * - Responds with a success message or an error message.
 * @param {Object} req - The request object containing the new username.
 * @param {Object} res - The response object.
 */
exports.updateUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const { newUsername } = req.body;

    // Update the user's username
    await User.updateOne({ username }, { username: newUsername });

    return res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};