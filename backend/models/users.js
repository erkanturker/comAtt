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
  static async register({username, password, firstName, lastName, email, role}) {
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
