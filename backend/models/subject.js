const db = require("../db");
const { NotFoundError, BadRequestError } = require("../expressError");
const { partialUpdate } = require("../helpers/sql");

class Subject {
  /**
   * Create a new subject.
   * 
   * @param {object} data - The data of the subject to be created.
   * @returns {object} - The created subject data.
   */
  static async create({ subjectName, teacherId }) {
    const result = await db.query(
      `INSERT INTO subjects (subject_name, teacher_id)
       VALUES ($1, $2)
       RETURNING subject_id AS "subjectId", subject_name AS "subjectName", teacher_id AS "teacherId"`,
      [subjectName, teacherId]
    );
    return result.rows[0];
  }

  /**
   * Get a subject by ID.
   * 
   * @param {number} id - The ID of the subject to retrieve.
   * @returns {object} - The subject data.
   * @throws {NotFoundError} - If no subject with the specified ID is found.
   */
  static async get(id) {
    const result = await db.query(
      `SELECT subject_id AS "subjectId", subject_name AS "subjectName", teacher_id AS "teacherId"
       FROM subjects
       WHERE subject_id = $1`,
      [id]
    );

    const subject = result.rows[0];

    if (!subject) throw new NotFoundError(`No subject: ${id}`);

    return subject;
  }

  /**
   * Get all subjects.
   * 
   * @returns {Array} - A list of all subjects.
   */
  static async getAll() {
    const result = await db.query(
      `SELECT subject_id AS "subjectId", subject_name AS "subjectName", teacher_id AS "teacherId"
       FROM subjects`
    );
    return result.rows;
  }

  /**
   * Update a subject.
   * 
   * @param {number} id - The ID of the subject to update.
   * @param {object} data - The data to update.
   * @returns {object} - The updated subject data.
   * @throws {NotFoundError} - If no subject with the specified ID is found.
   */
  static async update(id, data) {
    const { setCols, values } = partialUpdate(data, {
      subjectName: "subject_name",
      teacherId: "teacher_id"
    });
    const subjectIdIdx = "$" + (values.length + 1);

    const result = await db.query(
      `UPDATE subjects
       SET ${setCols}
       WHERE subject_id = ${subjectIdIdx}
       RETURNING subject_id AS "subjectId", subject_name AS "subjectName", teacher_id AS "teacherId"`,
      [...values, id]
    );

    const subject = result.rows[0];

    if (!subject) throw new NotFoundError(`No subject: ${id}`);

    return subject;
  }

  /**
   * Remove a subject by ID.
   * 
   * @param {number} id - The ID of the subject to remove.
   * @returns {void}
   * @throws {NotFoundError} - If no subject with the specified ID is found.
   */
  static async remove(id) {
    const result = await db.query(
      `DELETE
       FROM subjects
       WHERE subject_id = $1
       RETURNING subject_id`,
      [id]
    );

    const subject = result.rows[0];

    if (!subject) throw new NotFoundError(`No subject: ${id}`);
  }
}

module.exports = Subject;
