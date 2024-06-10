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
   * Records attendance for a specific period.
   *
   * @param {number} periodId - The ID of the period for which attendance is being recorded.
   * @param {Array} attendances - An array of attendance records, where each record is an object containing:
   *   - {number} studentId - The ID of the student.
   *   - {boolean} status - The attendance status (true for present, false for absent).
   * @param {string} date - The date when the attendance is recorded.
   * @returns {Promise<void>} - A promise that resolves when all attendance records have been successfully created.
  
   */
  static async periodAttendance(periodId, attendances, date) {
    attendances.forEach(async (attendance) => {
      await Attendance.create({
        studentId: attendance.studentId,
        periodId,
        date,
        status: attendance.status,
      });
    });
  }

  /**
   * Switches the status of attendance for a specific period.

   * @param {number} periodId - The ID of the period for which attendance status is being switched.
   * @param {Array} attendance - An array of attendance records, where each record is an object containing:
   *   - {number} studentId - The ID of the student.
   *   - {boolean} status - The new attendance status (true for present, false for absent).
   * @param {string} date - The date when the attendance status is switched.
   * @returns {Promise<void>} - A promise that resolves when all attendance statuses have been successfully updated.
   * @throws {Error} - Throws an error if there is an issue with switching the attendance status.
  
   */

  static async switchStatusOfAttendance(periodId, attendance, date) {
    attendance.forEach(async (attendance) => {
      await db.query(
        `
      UPDATE attendances
      SET status=$1, date = $2
      WHERE period_id=$3 AND student_id=$4;`,
        [attendance.status, date, periodId, attendance.studentId]
      );
    });
  }

  /**
   * Retrieves attendance records for a specific period.
   *
   * @param {number} periodId - The ID of the period for which attendance records are being retrieved.
   * @returns {Promise<Array>} - A promise that resolves to an array of attendance records, where each record is an object containing:
   *   - {number} attendanceId - The ID of the attendance record.
   *   - {number} studentId - The ID of the student.
   *   - {number} periodId - The ID of the period.
   *   - {string} date - The date of the attendance record.
   *   - {boolean} status - The attendance status (true for present, false for absent).
   */

  static async getAttendanceByPeriod(periodId) {
    const result = await db.query(
      `SELECT attendance_id AS "attendanceId", 
        student_id AS "studentId", 
        period_id AS "periodId", date, status
       FROM attendances
       WHERE period_id=$1`,
      [periodId]
    );
    return result.rows;
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
  /**
   * Retrieves all attendance records for the current term.
   * 
   * @returns {Promise<Array>} - A promise that resolves to an array of attendance records, where each record contains:
   * */

  static async getAttendancesByCurrentTerm() {
    const result = await db.query(`
    SELECT a.attendance_id AS "attendanceId", 
      a.student_id AS "studentId",
      a.status,p.period_id AS "periodId",
      p.period_number AS "periodNumber",
      p.subject_id AS "subjectId",
      p.group_id AS "groupId",
      p.date, p.term_id AS "termId",
      t.start_date AS "startDate",
      t.end_date AS "endDate"
      FROM attendances AS a
    JOIN periods AS p ON a.period_id = p.period_id
    RIGHT JOIN terms AS t ON p.term_id = t.term_id
    WHERE CURRENT_DATE BETWEEN t.start_date AND t.end_date`);

    return result.rows;
  }
}

module.exports = Attendance;
