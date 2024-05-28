const db = require("../db");
const { NotFoundError, BadRequestError } = require("../expressError");
const { partialUpdate } = require("../helpers/sql");

class Term {
  /**
   * Create a new term.
   * @param {object} data - The data of the term to be created.
   * @returns {object} - The created term data.
   * { "termId", "termName","startDate", "endDate"}
   */
  static async create({ termName, startDate, endDate }) {
    const result = await db.query(
      `INSERT INTO terms (term_name, start_date, end_date)
       VALUES ($1, $2, $3)
       RETURNING term_id AS "termId", term_name AS "termName", start_date AS "startDate", end_date AS "endDate"`,
      [termName, startDate, endDate]
    );
    return result.rows[0];
  }

  /**
   * Get a term by ID.
   * @param {number} id - The ID of the term to retrieve.
   * @returns {object} - The term data.
   *  { "termId", "termName","startDate", "endDate"}
   * @throws {NotFoundError} - If no term with the specified ID is found.
   */
  static async get(id) {
    const result = await db.query(
      `SELECT term_id AS "termId", term_name AS "termName", start_date AS "startDate", end_date AS "endDate"
       FROM terms
       WHERE term_id = $1`,
      [id]
    );

    const term = result.rows[0];

    if (!term) throw new NotFoundError(`No term: ${id}`);

    return term;
  }

  /**
   * Get all terms.
   *
   * @returns {Array} - [ { "termId", "termName","startDate", "endDate"} ... ]
   */
  static async getAll() {
    const result = await db.query(
      `SELECT term_id AS "termId", term_name AS "termName", start_date AS "startDate", end_date AS "endDate"
       FROM terms`
    );
    return result.rows;
  }

  /**
   * Update a term.
   *
   * @param {number} id - The ID of the term to update.
   * @param {object} data - The data to update.
   * @returns {object} - The updated term data.
   *  { "termId", "termName","startDate", "endDate"}
   * @throws {NotFoundError} - If no term with the specified ID is found.
   */
  static async update(id, data) {
    const { setCols, values } = partialUpdate(data, {
      termName: "term_name",
      startDate: "start_date",
      endDate: "end_date",
    });
    const termIdIdx = "$" + (values.length + 1);

    const result = await db.query(
      `UPDATE terms
       SET ${setCols}
       WHERE term_id = ${termIdIdx}
       RETURNING term_id AS "termId", term_name AS "termName", start_date AS "startDate", end_date AS "endDate"`,
      [...values, id]
    );

    const term = result.rows[0];

    if (!term) throw new NotFoundError(`No term: ${id}`);

    return term;
  }

  /**
   * Remove a term by ID.
   *
   * @param {number} id - The ID of the term to remove.
   * @returns {void}
   * @throws {NotFoundError} - If no term with the specified ID is found.
   */
  static async remove(id) {
    const result = await db.query(
      `DELETE
       FROM terms
       WHERE term_id = $1
       RETURNING term_id`,
      [id]
    );

    const term = result.rows[0];

    if (!term) throw new NotFoundError(`No term: ${id}`);
  }
}

module.exports = Term;
