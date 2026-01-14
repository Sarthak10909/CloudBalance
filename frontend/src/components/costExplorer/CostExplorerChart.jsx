import React, { useEffect, useState } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import StackedCostChart from "./StackedCostChart";
import CostTrendLineChart from "./CostTrendLineChart";
import {
  BarChart2,
  LineChart,
} from "lucide-react";
import FilterPanel from "./FilterPanel";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";

Charts(FusionCharts);

/* ---------- GROUP BY OPTIONS ---------- */
const groupByOptions = [
  "Service",
  "Instance Type",
  "Account ID",
  "Usage Type",
  "Platform",
  "Region",
  "Usage Type Group",
  "Instance"
];

const groupByMap = {
  "Service": "SERVICE",
  "Instance Type": "INSTANCE_TYPE",
  "Account ID": "ACCOUNT_ID",
  "Usage Type": "USAGE_TYPE",
  "Platform": "PLATFORM",
  "Region": "REGION",
  "Usage Type Group": "USAGE_TYPE_GROUP",
  "Instance": "INSTANCE_TYPE"
};

const months = [
  "Jan 2025",
  "Feb 2025",
  "Mar 2025",
  "Apr 2025",
  "May 2025",
  "Jun 2025",
];

function CostExplorerChart() {
  const [activeChart, setActiveChart] = useState("STACKED");
  const [groupBy, setGroupBy] = useState("Service");
  const [startMonth, setStartMonth] = useState("Jan 2025");
  const [endMonth, setEndMonth] = useState("Jun 2025");

  /* ---------- FILTER STATE ---------- */
  const [showFilters, setShowFilters] = useState(false);
  const [availableFilters, setAvailableFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  /* ---------- FETCH FILTER VALUES ---------- */
useEffect(() => {
  if (!showFilters) return;

  const fetchFilters = async () => {
    try {
      const res = await axiosInstance.get("/api/cost-explorer/filters", {
        params: {
          groupBy: groupByMap[groupBy],
        },
      });

      console.log("FILTER API RESPONSE:", res.data);

      setAvailableFilters(Array.isArray(res.data) ? res.data : []);
      setSelectedFilters([]);
    } catch (err) {
      console.error("Failed to fetch filters", err);
      setAvailableFilters([]);
    }
  };

  fetchFilters();
}, [showFilters, groupBy]);



  /* ---------- APPLY FILTERS ---------- */
  const applyFilters = async () => {
    const res = await axios.get("/api/cost-explorer/graph", {
      params: {
        groupBy: groupByMap[groupBy],
        startMonth,
        endMonth,
        values: selectedFilters, // axios handles encoding
      },
    });

    // TODO: map res.data -> FusionCharts dataset
    console.log("Filtered graph data:", res.data);
  };

  /* ---------- CHART CONFIGS (STATIC FOR NOW) ---------- */
  const stackedChartConfig = {
    chart: {
      caption: "AWS Cost Explorer",
      subcaption: `Grouped by ${groupBy}`,
      xaxisname: "Month",
      yaxisname: "Cost (USD)",
      numberprefix: "$",
      theme: "fusion",
      showBorder: "0",
      showShadow: "0",
      plotSpacePercent: "25",
      plotPadding: "5",
      showValues: "0",
    },
    categories: [{ category: [] }],
    dataset: [],
  };

  const lineChartConfig = {
    chart: {
      caption: "AWS Cost Trend",
      subcaption: "Monthly Total Cost",
      xaxisname: "Month",
      yaxisname: "Cost (USD)",
      numberprefix: "$",
      theme: "fusion",
      showBorder: "0",
      showShadow: "0",
      drawAnchors: "0",
      showValues: "0",
    },
    categories: [{ category: [] }],
    dataset: [],
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm p-6">

      {/* GROUP BY BAR */}
      <div className="-mx-6 mb-6 bg-gray-200 border-b">
        <div className="px-6 py-4 flex items-center gap-4">
          <span className="text-sm font-medium">Group By:</span>
          <div className="flex flex-wrap gap-2">
            {groupByOptions.map(option => (
              <button
                key={option}
                onClick={() => {
                  setGroupBy(option);
                  setShowFilters(false);
                }}
                className={`buttonCE ${
                  groupBy === option
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-500"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex gap-6">

        {/* LEFT SIDE */}
        <div className="flex-1">

          {/* CONTROLS */}
          <div className="flex items-center gap-3 mb-6">
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

            {/* CHART TOGGLE */}
            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={() => setActiveChart("STACKED")}
                className={`px-3 py-2 ${
                  activeChart === "STACKED" ? "bg-blue-600 text-white" : ""
                }`}
              >
                <BarChart2 size={16} />
              </button>
              <button
                onClick={() => setActiveChart("LINE")}
                className={`px-3 py-2 ${
                  activeChart === "LINE" ? "bg-blue-600 text-white" : ""
                }`}
              >
                <LineChart size={16} />
              </button>
            </div>

            {/* FILTER TOGGLE */}
            <button
              onClick={() => setShowFilters(prev => !prev)}
              className="px-3 py-2 text-sm border rounded-md"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* CHART */}
          {activeChart === "STACKED" ? (
            <StackedCostChart dataSource={stackedChartConfig} />
          ) : (
            <CostTrendLineChart dataSource={lineChartConfig} />
          )}
        </div>

        {/* RIGHT SIDE FILTER PANEL */}
        {showFilters && (
          <FilterPanel
            values={availableFilters}
            selectedValues={selectedFilters}
            onChange={(value) =>
              setSelectedFilters(prev =>
                prev.includes(value)
                  ? prev.filter(v => v !== value)
                  : [...prev, value]
              )
            }
            onApply={applyFilters}
          />
        )}
      </div>
    </div>
  );
}

export default CostExplorerChart;
