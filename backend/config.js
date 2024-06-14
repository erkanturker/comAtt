require("dotenv").config();

const PORT = process.env.PORT || 3001;

const SECRET_KEY = process.env.SECRET_KEY || "dev-secret";

function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "postgresql:///comatt_test"
    : process.env.DATABASE_URL || "postgresql:///comatt";
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
  PORT,
  SECRET_KEY,
  getDatabaseUri,
  BCRYPT_WORK_FACTOR,
};
