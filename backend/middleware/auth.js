const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

/**
 * Middleware to authenticate JWT tokens in HTTP requests.
 *
 * This middleware extracts the JWT token from the Authorization header,
 * verifies it, and attaches the decoded user information to the `res.locals` object.
 *
 */
function authJWT(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      // Extract the JWT token from the Authorization header
      const token = authHeader.replace(/^[Bb]earer /, "").trim();

      // Verify the JWT token and attach the decoded user information to res.locals
      res.locals.user = jwt.verify(token, SECRET_KEY);

      return next();
    }
  } catch (err) {
    // If there is an error (e.g., token verification fails), proceed to the next middleware
    return next();
  }

  /** Middleware to use when they be logged in as an admin user.
   *
   *  If not, raises Unauthorized.
   */

  function ensureIsAdmin(req, res, next) {
    try {
      if (res.locals.users.role !== "admin") {
        throw new UnauthorizedError();
      }
      return next();
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = { authJWT, ensureIsAdmin };
