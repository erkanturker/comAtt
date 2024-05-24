require("dotenv").config();

const PORT = process.env.PORT || 3001;

const SECRET_KEY = process.env.SECRET_KEY || "dev-secret";

module.exports = {
  PORT,
  SECRET_KEY,
};
