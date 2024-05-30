const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const createToken = require("../helpers/token");

let groupIds = [];
let subjectIds = [];
let studentIds = [];
let periodIds = [];
let termData = { termId: null };

async function commonBeforeAll() {
  await db.query("DELETE FROM attendances");
  await db.query("DELETE FROM periods");
  await db.query(`DELETE FROM users`);
  await db.query(`DELETE FROM groups`);
  await db.query("DELETE FROM students");
  await db.query("DELETE FROM terms");
  await db.query("DELETE FROM subjects");

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

  const studentResult = await db.query(
    `INSERT INTO students (group_id, first_name, last_name, age, parent_first_name, parent_last_name, parent_phone, parent_email)
     VALUES ($1, 'John', 'Doe', 10, 'Jane', 'Doe', '123-456-7890', 'jane.doe@example.com'),
            ($2, 'Jane', 'Smith', 12, 'John', 'Smith', '987-654-3210', 'john.smith@example.com')
     RETURNING student_id AS id`,
    [groupIds[0], groupIds[1]]
  );

  studentIds.splice(0, 0, ...studentResult.rows.map((row) => row.id));
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
  // Insert periods
  const periodResult = await db.query(
    `INSERT INTO periods (period_number, subject_id, group_id, term_id, date)
     VALUES (6, $1, $2, $3, '2024-01-07'),
            (5, $1, $2, $3, '2024-01-14')
     RETURNING period_id AS id`,
    [subjectIds[0], groupIds[0], termData.termId]
  );
  periodIds.splice(0, 0, ...periodResult.rows.map((row) => row.id));
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
  subjectIds,
  termData,
  studentIds,
  periodIds,
};
