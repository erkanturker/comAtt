const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");

let groupIds = [];
let subjectIds = [];
let termData = { termId: null };

async function commonBeforeAll() {
  await db.query("DELETE FROM periods");
  await db.query(`DELETE FROM users`);
  await db.query(`DELETE FROM groups`);
  await db.query("DELETE FROM subjects");
  await db.query("DELETE FROM terms");

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

  const resultSubjects = await db.query(`
    INSERT INTO subjects (subject_name, teacher_id)
    VALUES ( 'Math', 'u2'),
           ('Science', 'u2')
           RETURNING subject_id AS id`);
  subjectIds.splice(0, 0, ...resultSubjects.rows.map((r) => r.id));

  const resultTerm = await db.query(`
  INSERT INTO 
  terms (term_name, start_date, end_date)
  VALUES ('Summer 2024','2024-06-01', '2024-08-01')
  RETURNING term_id AS id`);

  termData.termId = resultTerm.rows[0].id;
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.query("DELETE FROM periods");
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM groups");
  await db.query("DELETE FROM subjects");
  await db.query("DELETE FROM terms");

  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonAfterAll,
  commonBeforeEach,
  commonAfterEach,
  groupIds,
  subjectIds,
  termData,
};
