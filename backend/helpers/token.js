const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT from user data. */

const createToken = (user) => {
  return jwt.sign(user, SECRET_KEY);
};

module.exports = createToken;
