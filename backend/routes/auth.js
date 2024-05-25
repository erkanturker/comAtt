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
 * Register a new user.
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
 * Generates a JWT token for authenticated users.
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

    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
