const db = require("../db");
const { NotFoundError } = require("../expressError");
const { partialUpdate } = require("../helpers/sql");

class Attendance {
  /**
   * Create a new attendance record.
   *
   * @param {object} data - The data of the attendance to be created.
   * @returns {object} - The created attendance data.
   */
  static async create({ studentId, periodId, date, status }) {
    const result = await db.query(
      `INSERT INTO attendances (student_id, period_id, date, status)
       VALUES ($1, $2, $3, $4)
       RETURNING attendance_id AS "attendanceId", student_id AS "studentId", 
                 period_id AS "periodId", date, status`,
      [studentId, periodId, date, status]
    );
    return result.rows[0];
  }

  /**
   * Get attendance by ID.
   *
   * @param {number} id - The ID of the attendance to retrieve.
   * @returns {object} - The attendance data.
   * @throws {NotFoundError} - If no attendance is found.
   */
  static async getById(id) {
    const result = await db.query(
      `SELECT attendance_id AS "attendanceId", student_id AS "studentId", 
              period_id AS "periodId", date, status
       FROM attendances
       WHERE attendance_id = $1`,
      [id]
    );

    const attendance = result.rows[0];

    if (!attendance)
      throw new NotFoundError(`No attendance found with ID: ${id}`);

    return attendance;
  }

  /**
   * Update an attendance record.
   *
   * @param {number} id - The ID of the attendance to update.
   * @param {object} data - The data to update.
   * @returns {object} - The updated attendance data.
   * @throws {NotFoundError} - If no attendance is found.
   */
  static async update(id, data) {
    const { setCols, values } = partialUpdate(data, {
      studentId: "student_id",
      periodId: "period_id",
      date: "date",
      status: "status",
    });
    const attendanceIdIdx = "$" + (values.length + 1);

    const result = await db.query(
      `UPDATE attendances
       SET ${setCols}
       WHERE attendance_id = ${attendanceIdIdx}
       RETURNING attendance_id AS "attendanceId", student_id AS "studentId", 
                 period_id AS "periodId", date, status`,
      [...values, id]
    );

    const attendance = result.rows[0];

    if (!attendance)
      throw new NotFoundError(`No attendance found with ID: ${id}`);

    return attendance;
  }

  /**
   * Remove an attendance record by ID.
   *
   * @param {number} id - The ID of the attendance to remove.
   * @returns {void}
   * @throws {NotFoundError} - If no attendance is found.
   */
  static async remove(id) {
    const result = await db.query(
      `DELETE FROM attendances
       WHERE attendance_id = $1
       RETURNING attendance_id`,
      [id]
    );

    const attendance = result.rows[0];

    if (!attendance)
      throw new NotFoundError(`No attendance found with ID: ${id}`);
  }

  /**
   * Get all attendance records.
   *
   * @returns {Array} - A list of all attendance records.
   */
  static async getAll() {
    const result = await db.query(
      `SELECT attendance_id AS "attendanceId", student_id AS "studentId", 
              period_id AS "periodId", date, status
       FROM attendances`
    );

    return result.rows;
  }
}

module.exports = Attendance;
