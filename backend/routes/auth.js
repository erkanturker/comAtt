const express = require("express");
const jwt = require("jsonwebtoken");

const {
  registrationSchema,
  loginSchema,
} = require("../validators/authValidators");

const { BadRequestError } = require("../expressError");
const User = require("../models/users");
const createToken = require("../helpers/token");

const router = express.Router();

/**
 * POST /register
 *
 * Register a new user.
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - User registration data
 * @param {string} req.body.username - Username of the new user
 * @param {string} req.body.password - Password of the new user
 * @param {string} req.body.firstName - First name of the new user
 * @param {string} req.body.lastName - Last name of the new user
 * @param {string} req.body.email - Email address of the new user
 * @param {string} req.body.role - Role of the new user (admin or teacher)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {Promise<void>} 201 Created with the new user data
 * @throws {BadRequestError} 400 Bad Request if validation fails
 */

router.post("/register", async (req, res, next) => {
  try {
    // Validate request body against the registration schema
    const { error } = registrationSchema.validate(req.body, {
      abortEarly: false,
    });

    // If validation fails, collect all error messages and throw a BadRequestError
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      throw new BadRequestError(errors);
    }

    const user = await User.register({ ...req.body });

    return res.status(201).json(user);
  } catch (err) {
    // Pass any errors to the next middleware function
    return next(err);
  }
});

/**
 * POST /token
 *
 * Generates a JWT token for authenticated users.
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - User login data
 * @param {string} req.body.username - Username of the user
 * @param {string} req.body.password - Password of the user
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {Promise<void>} 200 OK with the generated token
 * @throws {BadRequestError} 400 Bad Request if validation fails
 */

router.post("/token", async (req, res, next) => {
  try {
    // Validate request body against the login schema
    const { error } = loginSchema.validate(req.body, { abortEarly: false });

    // If validation fails, collect all error messages and throw a BadRequestError
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      throw new BadRequestError(errors);
    }

    // Authenticate the user with the provided credentials
    const user = await User.authenticate({ ...req.body });

    // Create a JWT token for the authenticated user
    const token = createToken(user);

    return res.json(token);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
