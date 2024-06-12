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
