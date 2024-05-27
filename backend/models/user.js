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
   * Returns { username, firstName, lastName, email, role }
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
    RETURNING username, first_name AS "firstName", last_name AS "lastName", email, role
    `,
      [username, hashedPassword, firstName, lastName, email, role]
    );

    const user = result.rows[0];

    return user;
  }

  /**
   * Authenticates a user with the provided username and password.
   * Returns { username, first_name, last_name, email, role }
   */
  static async authenticate({ username, password }) {
    // Find the user by username
    const result = await db.query(
      `
      SELECT 
        username,
        password,
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        role
      FROM users
      WHERE username=$1
    `,
      [username]
    );

    const user = result.rows[0];
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        delete user.password;
        return user;
      }
    }

    // If username or password is invalid, throw an UnauthorizedError
    throw new UnauthorizedError("Invalid username/password");
  }

  /**
   * find all users
   * Returns [{ username, first_name, last_name, email, role }, ...]
   */
  static async findAll() {
    const result = await db.query(`
    SELECT 
        username,
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        role
      FROM users`);

    return result.rows;
  }

  /**
   * Retrieves a user by username.
   * @param {string} username - The username of the user to retrieve
   * @returns {Promise<Object>} The user details { username, first_name, last_name, email, role }
   * @throws {NotFoundError} If the user is not found
   */
  static async get(username) {
    const result = await db.query(
      `
      SELECT 
        username,
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        role
      FROM users
      WHERE username=$1
    `,
      [username]
    );

    const user = result.rows[0];
    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

  /**
   * Remove a user by username.
   * Deletes the user from the database
   * If the user does not exist, it throws a NotFoundError.
   */

  static async remove(username) {
    const result = await db.query(
      `DELETE
       FROM users
      WHERE username=$1 
      RETURNING username`,
      [username]
    );

    const user = result.rows[0];
    if (!user) throw new NotFoundError(`No user: ${username}`);
  }
}

module.exports = User;
