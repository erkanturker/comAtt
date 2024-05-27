const { BadRequestError } = require("../expressError");

/**
 * Helper function to generate a dynamic SQL query for partial update.
 *
 * This function constructs the SQL `SET` clause and the corresponding values array
 * based on the provided data to update and a mapping of JavaScript object keys to
 * database column names.

 * Example:
 * const data = { firstName: "John", age: 30 };
 * const jstoSql = { firstName: "first_name" };
 * const result = partialUpdate(data, jstoSql);
 * // result = { setCols: '"first_name"=$1, "age"=$2', values: ["John", 30] }
 */

function partialUpdate(data, jstoSql) {
  const keys = Object.keys(data);
  if (keys.length == 0) throw new BadRequestError("No Data");

  const cols = keys.map(
    (colName, idx) => `"${jstoSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(data),
  };
}

module.exports = partialUpdate;
