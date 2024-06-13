/**
 * Transforms attendance data into a format suitable for displaying in a table.
 *  * @param {Object} data - The attendance data where the key is the date and the value is an array of period objects.
 * Each period object contains:
 *   - {number} periodNumber - The number of the period.
 *   - {boolean} status - The attendance status (true for present, false for absent).
 *
 * @returns {Object} An object containing:
 *   - {Array} transformedData - An array of objects representing the rows of the table. Each object contains:
 *     - {string} date - The date of the attendance.
 *     - {string} periodX - The attendance status for each period (X is the period number). The value is either "Present" or "Absent".
 *   - {Array} columns - An array of objects representing the columns of the table. Each object contains:
 *     - {string} label - The label of the column.
 *     - {string} accessor - The key used to access the column's value in the row objects.
 */

const transformData = (data) => {
  const transformedData = [];
  const columns = [{ label: "Date", accessor: "date" }];

  const allPeriods = new Set();

  for (const date in data) {
    data[date].forEach((period) => allPeriods.add(period.periodNumber));
  }

  Array.from(allPeriods)
    .sort()
    .forEach((periodNumber) => {
      columns.push({
        label: `Period ${periodNumber}`,
        accessor: `period${periodNumber}`,
      });
    });

  // Transform data into a flat array
  for (const date in data) {
    const row = { date };

    columns.slice(1).forEach((col) => {
      row[col.accessor] = "N/A";
    });

    data[date].forEach((period) => {
      row[`period${period.periodNumber}`] = period.status
        ? "Present"
        : "Absent";
    });

    transformedData.push(row);
  }
  return { transformedData, columns };
};

export default transformData;
