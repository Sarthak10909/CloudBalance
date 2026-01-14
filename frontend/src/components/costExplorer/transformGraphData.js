export function transformGraphData(rawData) {
  if (!Array.isArray(rawData) || rawData.length === 0) {
    return { categories: [], dataset: [], table: [] };
  }

  // unique months
  const months = [...new Set(rawData.map(d => d.billMonth))].sort();

  // unique groups (Service / Region / etc)
  const groups = [...new Set(rawData.map(d => d.groupValue))];

  // categories for fusion chart
  const categories = months.map(m => ({
    label: new Date(m).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }),
  }));

  // dataset
  const dataset = groups.map(group => ({
    seriesname: group,
    data: months.map(month => {
      const found = rawData.find(
        d => d.groupValue === group && d.billMonth === month
      );
      return { value: found ? found.totalCost : 0 };
    }),
  }));

  // table data
  const table = groups.map(group => {
    const values = months.map(month => {
      const found = rawData.find(
        d => d.groupValue === group && d.billMonth === month
      );
      return found ? found.totalCost : 0;
    });

    return {
      name: group,
      values,
      total: values.reduce((a, b) => a + b, 0),
    };
  });

  return { categories, dataset, table };
}
