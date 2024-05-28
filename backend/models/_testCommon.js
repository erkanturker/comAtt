const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");

let groupIds = [];

async function commonBeforeAll() {
  await db.query(`DELETE FROM users`);

  await db.query(`DELETE FROM groups`);

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

  const resultGroup = await db.query(`INSERT
   INTO groups (group_name)
    VALUES ('K-2 Boys'), ('K-2 Girls')
    RETURNING group_id AS id`);

  groupIds.splice(0, 0, ...resultGroup.rows.map((r) => r.id));
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM groups");
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonAfterAll,
  commonBeforeEach,
  commonAfterEach,
  groupIds,
};
