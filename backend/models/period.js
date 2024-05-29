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
                  term_id AS "termId", date
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
    });
    const periodIdIdx = "$" + (values.length + 1);

    const result = await db.query(
      `UPDATE periods
       SET ${setCols}
       WHERE period_id = ${periodIdIdx}
       RETURNING period_id AS "periodId", period_number AS "periodNumber", subject_id AS "subjectId",
                 group_id AS "groupId", term_id AS "termId", date`,
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
