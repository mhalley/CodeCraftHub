const mongoose = require('mongoose');

// Define the schema for the User model
/**
 * User Schema
 * @typedef {Object} UserSchema
 * @property {String} username - The username of the user. Must be unique and required.
 * @property {String} password - The password of the user. Required.
 */
const userSchema = new mongoose.Schema({
   /**
   * The username of the user.
   * @type {String}
   * @required true
   * @unique true
   */
  username: {
    type: String,
    required: true, // Username is required
    unique: true, // Ensures usernames are unique across the collection
  },
   /**
   * The password of the user.
   * @type {String}
   * @required true
   */
  password: {
    type: String,
    required: true, // Password is required
  },
});

// Create the User model using the schema
/**
 * User Model
 * @typedef {mongoose.Model} UserModel
 */
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;