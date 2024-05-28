const db = require("../db");
const { NotFoundError, BadRequestError } = require("../expressError");
const { partialUpdate } = require("../helpers/sql");

class Student {
  /**
   * Create a new student.
   * @param {object} data - The data of the student to be created.
   * { groupId,firstName,lastName,age,parentFirstName,parentLastName,parentPhone,parentEmail,}
   * @returns {object} - The created student data.
   */
  static async create({
    groupId,
    firstName,
    lastName,
    age,
    parentFirstName,
    parentLastName,
    parentPhone,
    parentEmail,
  }) {
    const result = await db.query(
      `INSERT INTO students (group_id, first_name, last_name, age, parent_first_name, parent_last_name, parent_phone, parent_email)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING student_id AS "studentId", group_id AS "groupId", first_name AS "firstName",
        last_name AS "lastName", age, parent_first_name AS "parentFirstName",
         parent_last_name AS "parentLastName", parent_phone AS "parentPhone", parent_email AS "parentEmail"`,
      [
        groupId,
        firstName,
        lastName,
        age,
        parentFirstName,
        parentLastName,
        parentPhone,
        parentEmail,
      ]
    );
    return result.rows[0];
  }

  /**
   * Get a student by ID.
   *
   * @param {number} id - The ID of the student to retrieve.
   * @returns {object} - The student data. { groupId,firstName,lastName,age,parentFirstName,parentLastName,parentPhone,parentEmail,}
   * @throws {NotFoundError} - If no student with the specified ID is found.
   */
  static async get(id) {
    const result = await db.query(
      `SELECT student_id AS "studentId", group_id AS "groupId", first_name AS "firstName",
      last_name AS "lastName", age, parent_first_name AS "parentFirstName",
       parent_last_name AS "parentLastName", parent_phone AS "parentPhone", parent_email AS "parentEmail"
       FROM students
       WHERE student_id = $1`,
      [id]
    );
    const student = result.rows[0];

    if (!student) throw new NotFoundError(`No student: ${id}`);

    return student;
  }

  /**
   * Update student data.
   *
   * @param {number} id - The ID of the student to update.
   * @param {object} data - The data to update.
   * @returns {object} - The updated student data. { groupId,firstName,lastName,age,parentFirstName,parentLastName,parentPhone,parentEmail,}
   * @throws {NotFoundError} - If no student with the specified ID is found.
   */
  static async update(id, data) {
    const { setCols, values } = partialUpdate(data, {
      firstName: "first_name",
      lastName: "last_name",
      parentFirstName: "parent_first_name",
      parentLastName: "parent_last_name",
      parentPhone: "parent_phone",
      parentEmail: "parent_email",
    });
    const studentIdIdx = "$" + (values.length + 1);

    const result = await db.query(
      `UPDATE students
       SET ${setCols}
       WHERE student_id = ${studentIdIdx}
       RETURNING student_id AS "studentId", group_id AS "groupId", first_name AS "firstName",
       last_name AS "lastName", age, parent_first_name AS "parentFirstName",
        parent_last_name AS "parentLastName", parent_phone AS "parentPhone", parent_email AS "parentEmail"`,
      [...values, id]
    );

    const student = result.rows[0];

    if (!student) throw new NotFoundError(`No student: ${id}`);

    return student;
  }

  /**
   * Remove a student by ID.
   *
   * @param {number} id - The ID of the student to remove.
   * @returns {void}
   * @throws {NotFoundError} - If no student with the specified ID is found.
   */
  static async remove(id) {
    const result = await db.query(
      `DELETE
       FROM students
       WHERE student_id = $1
       RETURNING student_id`,
      [id]
    );

    const student = result.rows[0];

    if (!student) throw new NotFoundError(`No student: ${id}`);
  }

  /**
   * Get all students.
   *
   * @returns {Array} - A list of all students.[{ groupId,firstName,lastName,age,parentFirstName,parentLastName,parentPhone,parentEmail},...]
   */
  static async getAll() {
    const result = await db.query(
      `SELECT student_id AS "studentId", group_id AS "groupId", first_name AS "firstName",
                last_name AS "lastName", age, parent_first_name AS "parentFirstName",
                parent_last_name AS "parentLastName", parent_phone AS "parentPhone", parent_email AS "parentEmail"
       FROM students`
    );

    return result.rows;
  }
}

module.exports = Student;
