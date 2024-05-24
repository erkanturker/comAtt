const bcrypt = require("bcrypt");
const db = require("../db");
const {
  ExpressError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  BadRequestError,
} = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
  /**
   * Registers a new user with the provided details.
   * @param {Object} userDetails - The details of the user to register
   * @param {string} userDetails.username - The username of the new user
   * @param {string} userDetails.password - The password of the new user
   * @param {string} userDetails.firstName - The first name of the new user
   * @param {string} userDetails.lastName - The last name of the new user
   * @param {string} userDetails.email - The email address of the new user
   * @param {string} userDetails.role - The role of the new user (admin or teacher)
   * @returns {Promise<Object>} The newly created user
   * @throws {BadRequestError} If the username already exists
   */

  static async register({
    username,
    password,
    firstName,
    lastName,
    email,
    role,
  }) {
    // Check if the username already exists
    const duplicateCheck = await db.query(
      `
    SELECT username
    FROM users
    WHERE username=$1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `
    INSERT INTO users
    (username,password,first_name,last_name,email,role)
    VALUES($1,$2,$3,$4,$5,$6)
    RETURNING username, first_name AS firstName, last_name AS lastName, email, role
    `,
      [username, hashedPassword, firstName, lastName, email, role]
    );

    const user = result.rows[0];

    return user;
  }
}

module.exports = User;
