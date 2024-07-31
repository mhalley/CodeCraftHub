const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * Route for user registration.
 * 
 * @route POST /users/register
 * @group Users - Operations about users
 * @param {Object} request.body - User registration details
 * @param {String} request.body.username - The username of the user to register
 * @param {String} request.body.password - The password for the new user
 * @returns {Object} 201 - User registration successful
 * @returns {Object} 409 - Username already exists
 * @returns {Object} 500 - Internal server error
 * @example
 * // Example request
 * POST /users/register
 * {
 *   "username": "newuser",
 *   "password": "securepassword"
 * }
 * @example
 * // Example response
 * {
 *   "message": "User registered successfully"
 * }
 */
router.post('/register', userController.registerUser);

/**
 * Route for user login.
 * 
 * @route POST /users/login
 * @group Users - Operations about users
 * @param {Object} request.body - User login credentials
 * @param {String} request.body.username - The username of the user logging in
 * @param {String} request.body.password - The password for the user
 * @returns {Object} 200 - Login successful, returns JWT token
 * @returns {Object} 401 - Invalid username or password
 * @returns {Object} 500 - Internal server error
 * @example
 * // Example request
 * POST /users/login
 * {
 *   "username": "existinguser",
 *   "password": "password123"
 * }
 * @example
 * // Example response
 * {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 */
router.post('/login', userController.loginUser);


/**
 * Route to update user profile.
 * 
 * @route PUT /users/{username}
 * @group Users - Operations about users
 * @param {String} username.path.required - The current username of the user to update
 * @param {Object} request.body - User profile update details
 * @param {String} request.body.newUsername - The new username to replace the old one
 * @returns {Object} 200 - Profile updated successfully
 * @returns {Object} 500 - Internal server error
 * @example
 * // Example request
 * PUT /users/oldusername
 * {
 *   "newUsername": "newusername"
 * }
 * @example
 * // Example response
 * {
 *   "message": "User profile updated successfully"
 * }
 */
router.put('/:username', userController.updateUserProfile);

module.exports = router;