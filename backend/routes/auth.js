const express = require("express");
const {
  registrationSchema,
  loginSchema,
} = require("../validators/authValidators");
const { BadRequestError } = require("../expressError");
const User = require("../models/users");

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

router.post("/token", async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      throw new BadRequestError(errors);
    }

    const user = await User.authenticate({ ...req.body });

    return res.json(user);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
