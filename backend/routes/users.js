const express = require("express");
const User = require("../models/user");
const {
  ensureIsAdmin,
  ensureCorrectUserOrAdmin,
} = require("../middleware/auth");

const router = express.Router();

/**
 * GET /users
 * Retrieve all users.
 * This route is protected and can only be accessed by users with an "admin" role.
 * @returns {Promise<void>} 200 OK with the list of users
 *  "users": [  {username, firstName, lastName, email, role}]
 * @throws {Error} Passes any caught errors to the next middleware
 */

router.get("/", ensureIsAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ users });
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /:username
 * Retrieve a user by username.
 *  * This route fetches the user details for a given username. It is protected and
 * can only be accessed by the user themselves or an admin.
 * @returns {Promise<void>} 200 OK with the user details
 * @throws {Error} Passes any caught errors to the next middleware
 */

router.get("/:username", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
