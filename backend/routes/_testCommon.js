const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const createToken = require("../helpers/token");

async function commonBeforeAll() {
  await db.query(`DELETE FROM users`);

  await db.query(
    `
  INSERT INTO users(username,
                    password,
                    first_name,
                    last_name,
                    email,
                    role)
  VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com','admin'),
         ('u2', $2, 'U2F', 'U2L', 'u2@email.com','teacher')
  RETURNING username`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
    ]
  );
}

async function commonAfterAll() {
  await db.end();
}

const adminToken = createToken({
  username: "u1",
  firstName: "U1F",
  lastName: "U1L",
  email: "u1@email.com",
  role: "admin",
});

const teacherToken = createToken({
  username: "u2",
  firstName: "U2F",
  lastName: "U2L",
  email: "u2@email.com",
  role: "teacher",
});

module.exports = { commonBeforeAll, commonAfterAll, adminToken, teacherToken };
