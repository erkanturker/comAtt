const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const createToken = require("../helpers/token");

let groupIds = [];

async function commonBeforeAll() {
  await db.query(`DELETE FROM users`);

  await db.query(`DELETE FROM groups`);

  await db.query("DELETE FROM students");

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
    VALUES ('K-2 Boys'), ('K-2 Girls'),('5-8 Boys')
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

module.exports = {
  commonBeforeAll,
  commonAfterAll,
  adminToken,
  teacherToken,
  commonBeforeEach,
  commonAfterEach,
  groupIds,
};
