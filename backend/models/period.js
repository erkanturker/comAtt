const db = require("../db");
const { NotFoundError } = require("../expressError");
const { partialUpdate } = require("../helpers/sql");

class Period {
  /**
   * Create a new period.
   *
   * @param {object} data - The data of the period to be created.
   * @returns {object} - The created period data.
   */
  static async create({ periodNumber, subjectId, groupId, termId, date }) {
    const result = await db.query(
      `INSERT INTO periods (period_number, subject_id, group_id, term_id, date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING period_id AS "periodId", period_number AS "periodNumber", subject_id AS "subjectId",
                 group_id AS "groupId", term_id AS "termId", date`,
      [periodNumber, subjectId, groupId, termId, date]
    );
    return result.rows[0];
  }
  /**
   * Retrieves the upcoming scheduled periods for a teacher.
   * @param {string} username - The username of the teacher.
   * @returns {Promise<Array>} - A promise that resolves to an array of upcoming scheduled periods, where each period is an object containing:
   *   - {number} periodId - The ID of the period.
   *   - {number} periodNumber - The number of the period.
   *   - {number} subjectId - The ID of the subject.
   *   - {number} groupId - The ID of the group.
   *   - {number} termId - The ID of the term.
   *   - {string} date - The date of the period.
   *   - {boolean} attendanceTaken - Indicates if attendance has been taken for the period.
   *   - {string} subjectName - The name of the subject.
   *   - {string} groupName - The name of the group.
   */

  static async getTeacherUpcomingScheduled(username) {
    const result = await db.query(
      ` WITH upcoming_school_day AS (
        SELECT p.date
        FROM "periods" AS p
        JOIN subjects AS s ON s.subject_id = p.subject_id
        WHERE s.teacher_id = $1
          AND p.date >= CURRENT_DATE
        GROUP BY p.date
        ORDER BY p.date ASC
        LIMIT 1
      )
      SELECT 
        p.period_id AS "periodId",
        p.period_number AS "periodNumber",
        p.subject_id AS "subjectId",
        p.group_id AS "groupId",
        p.term_id AS "termId",
        p.date AS "date",
        p.attendance_taken AS "attendanceTaken",
        s.subject_name AS "subjectName",
        g.group_name AS "groupName"
      FROM "periods" AS p
      JOIN subjects AS s ON s.subject_id = p.subject_id
      JOIN groups AS g ON g.group_id = p.group_id
      JOIN upcoming_school_day ON TRUE -- Join to make the CTE accessible in WHERE clause
      WHERE p.date BETWEEN CURRENT_DATE AND (SELECT date FROM upcoming_school_day)
      AND s.teacher_id = $1
      ORDER BY p.period_number ASC;`,
      [username]
    );

    return result.rows;
  }

  /**
   * Retrieves students for a given period ID.
   * @param {number} periodId - The ID of the period.
   * @returns {Promise<Array>} - A promise that resolves to an array of students, where each student is an object containing:
   *   - {number} studentId - The ID of the student.
   *   - {string} firstName - The first name of the student.
   *   - {string} lastName - The last name of the student.
   * @throws {Error} - Throws an error if there is an issue with retrieving the students.
   */
  static async getStudentsForPeriod(periodId) {
    const result = await db.query(
      `SELECT st.student_id AS "studentId", st.first_name AS "firstName", st.last_name AS "lastName"
       FROM students AS st
       JOIN periods AS p ON st.group_id = p.group_id
       WHERE p.period_id = $1`,
      [periodId]
    );
    return result.rows;
  }

  /**
   * Get all periods.
   *
   * @returns {Array} - A list of all periods.
   */
  static async getAll() {
    const result = await db.query(
      `SELECT period_id AS "periodId", period_number AS "periodNumber", 
                  subject_id AS "subjectId", group_id AS "groupId", 
                  term_id AS "termId", date
           FROM periods`
    );

    return result.rows;
  }

  /**
   * Get a period by ID.
   *
   * @param {number} id - The ID of the period to retrieve.
   * @returns {object} - The period data.
   * @throws {NotFoundError} - If no period is found with the given ID.
   */
  static async getById(id) {
    const result = await db.query(
      `SELECT period_id AS "periodId", period_number AS "periodNumber", 
                  subject_id AS "subjectId", group_id AS "groupId", 
                  term_id AS "termId", date,  attendance_taken AS "attendanceTaken"
           FROM periods
           WHERE period_id = $1`,
      [id]
    );

    const period = result.rows[0];

    if (!period) throw new NotFoundError(`No period found with ID: ${id}`);

    return period;
  }

  /**
   * Update a period.
   *
   * @param {number} id - The ID of the period to update.
   * @param {object} data - The data to update.
   * @returns {object} - The updated period data.
   * @throws {NotFoundError} - If no period is found with the given ID.
   */
  static async update(id, data) {
    const { setCols, values } = partialUpdate(data, {
      periodNumber: "period_number",
      subjectId: "subject_id",
      groupId: "group_id",
      termId: "term_id",
      date: "date",
      attendanceTaken: "attendance_taken",
    });
    const periodIdIdx = "$" + (values.length + 1);

    const result = await db.query(
      `UPDATE periods
       SET ${setCols}
       WHERE period_id = ${periodIdIdx}
       RETURNING period_id AS "periodId", period_number AS "periodNumber", subject_id AS "subjectId",
                 group_id AS "groupId", term_id AS "termId", date,attendance_taken AS "attendanceTaken"`,
      [...values, id]
    );

    const period = result.rows[0];

    if (!period) throw new NotFoundError(`No period found with ID: ${id}`);

    return period;
  }

  /**
   * Remove a period by ID.
   *
   * @param {number} id - The ID of the period to remove.
   * @throws {NotFoundError} - If no period is found with the given ID.
   */
  static async remove(id) {
    const result = await db.query(
      `DELETE FROM periods
       WHERE period_id = $1
       RETURNING period_id`,
      [id]
    );

    const period = result.rows[0];

    if (!period) throw new NotFoundError(`No period found with ID: ${id}`);
  }
}

module.exports = Period;
