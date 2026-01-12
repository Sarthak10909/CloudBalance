// import React, { useState } from "react";
// import CostExplorerChart from "./CostExplorerChart";
// import { costExplorerData } from "./CostExplorerDummyData";

// const groupByOptions = [
//   "Service",
//   "Instance Type",
//   "Region",
//   "AWS Account"
// ];

// const months = [
//   "Jan 2025", "Feb 2025", "Mar 2025",
//   "Apr 2025", "May 2025", "Jun 2025"
// ];

// function CostExplorer() {
//   const [groupBy, setGroupBy] = useState("Service");
//   const [startMonth, setStartMonth] = useState("Jan 2025");
//   const [endMonth, setEndMonth] = useState("Jun 2025");

//   const chartConfig = {
//     chart: {
//       caption: "AWS Cost Explorer",
//       subcaption: `Grouped by ${groupBy}`,
//       xaxisname: "Month",
//       yaxisname: "Cost (USD)",
//       numberprefix: "$",
//       theme: "candy",
//       showsum: "1"
//     },
//     categories: [{ category: costExplorerData.categories }],
//     dataset: costExplorerData.dataset
//   };

//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <div className="flex gap-4 mb-6">
//         <select value={groupBy} onChange={e => setGroupBy(e.target.value)}>
//           {groupByOptions.map(opt => (
//             <option key={opt}>{opt}</option>
//           ))}
//         </select>

//         <select value={startMonth} onChange={e => setStartMonth(e.target.value)}>
//           {months.map(m => <option key={m}>{m}</option>)}
//         </select>

//         <select value={endMonth} onChange={e => setEndMonth(e.target.value)}>
//           {months.map(m => <option key={m}>{m}</option>)}
//         </select>
//       </div>

//       <CostExplorerChart dataSource={chartConfig} />
//     </div>
//   );
// }

// export default CostExplorer;

import React, { useState } from "react";
import StackedCostChart from "./StackedCostChart";
import CostTrendLineChart from "./CostTrendLineChart";
import { costExplorerData } from "./CostExplorerDummyData";

const groupByOptions = [
  "Service",
  "Instance Type",
  "Region",
  "AWS Account"
];

const months = [
  "Jan 2025",
  "Feb 2025",
  "Mar 2025",
  "Apr 2025",
  "May 2025",
  "Jun 2025"
];

function CostExplorer() {
  const [activeChart, setActiveChart] = useState("STACKED");
  const [groupBy, setGroupBy] = useState("Service");
  const [startMonth, setStartMonth] = useState("Jan 2025");
  const [endMonth, setEndMonth] = useState("Jun 2025");

  /* -------- Stacked Chart Config -------- */
  const stackedChartConfig = {
    chart: {
      caption: "AWS Cost Explorer",
      subcaption: `Grouped by ${groupBy}`,
      xaxisname: "Month",
      yaxisname: "Cost (USD)",
      numberprefix: "$",
      theme: "gammel",
      showsum: "1",
      legendposition: "bottom",
      showvalues: "0"
    },
    categories: [{ category: costExplorerData.categories }],
    dataset: costExplorerData.dataset
  };

  /* -------- Line Chart Config -------- */
  const lineChartConfig = {
    chart: {
      caption: "AWS Cost Trend",
      subcaption: "Monthly Total Cost",
      xaxisname: "Month",
      yaxisname: "Cost (USD)",
      numberprefix: "$",
      theme: "gammel",
      showvalues: "0",
      drawanchors: "1"
    },
    categories: [{ category: costExplorerData.categories }],
    dataset: [
      {
        seriesname: "Total Cost",
        data: [
          { value: 570 },
          { value: 695 },
          { value: 665 },
          { value: 770 },
          { value: 810 },
          { value: 850 }
        ]
      }
    ]
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm p-6">
      {/* Header + Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <h2 className="text-lg font-semibold mr-auto">
          Cost Explorer
        </h2>

        <select
          value={groupBy}
          onChange={e => setGroupBy(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        >
          {groupByOptions.map(opt => (
            <option key={opt}>{opt}</option>
          ))}
        </select>

        <select
          value={startMonth}
          onChange={e => setStartMonth(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        >
          {months.map(m => <option key={m}>{m}</option>)}
        </select>

        <select
          value={endMonth}
          onChange={e => setEndMonth(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        >
          {months.map(m => <option key={m}>{m}</option>)}
        </select>
      </div>

      {/* Chart Toggle Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveChart("STACKED")}
          className={`px-4 py-2 rounded text-sm border ${
            activeChart === "STACKED"
              ? "bg-blue-600 text-white"
              : "bg-white"
          }`}
        >
          Monthly Cost Breakdown
        </button>

        <button
          onClick={() => setActiveChart("LINE")}
          className={`px-4 py-2 rounded text-sm border ${
            activeChart === "LINE"
              ? "bg-blue-600 text-white"
              : "bg-white"
          }`}
        >
          Cost Trend
        </button>
      </div>

      {/* Chart Render */}
      {activeChart === "STACKED" ? (
        <StackedCostChart dataSource={stackedChartConfig} />
      ) : (
        <CostTrendLineChart dataSource={lineChartConfig} />
      )}
    </div>
  );
}

export default CostExplorer;

