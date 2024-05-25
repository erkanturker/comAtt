const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");

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

module.exports = { commonBeforeAll, commonAfterAll };
