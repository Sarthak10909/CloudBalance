import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import StackedCostChart from "./StackedCostChart";
import CostTrendLineChart from "./CostTrendLineChart";
import { useState } from "react";
import { costExplorerData } from "./CostExplorerDummyData";
import {
    BarChart,
    BarChart2,
    LineChart,
    PieChart,
    Activity,
    TrendingUp,
    TrendingDown
} from "lucide-react";
import FilterPanel from "./filterPanel";


Charts(FusionCharts);



const groupByOptions = [
    "Service",
    "Instance Type",
    "Account ID",
    "Usage Type",
    "Platform",
    "Region",
    "Usage Type Group",
];

const months = [
    "Jan 2025",
    "Feb 2025",
    "Mar 2025",
    "Apr 2025",
    "May 2025",
    "Jun 2025"
];

function CostExplorerChart() {
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
    }
    return (
        // <div className="bg-white border-b rounded-xl shadow-sm m-5 ">

        //     <div className="bg-gray-200 flex items-center gap-4 px-6 py-4 mb-4">
        //         <span className="text-sm font-medium whitespace-nowrap">
        //             Group By:
        //         </span>

        //         <div className="flex flex-wrap gap-4">
        //             {groupByOptions.map(option => (
        //                 <button
        //                     key={option}
        //                     onClick={() => setGroupBy(option)}
        //                     className={`buttonCE ${groupBy === option
        //                         ? "bg-blue-600 text-white"
        //                         : "bg-white text-blue-500"
        //                         }`}
        //                 >
        //                     {option}
        //                 </button>
        //             ))}
        //         </div>

        //     </div>

        //     {/* Header + Controls */}
        //     <div className="flex flex-wrap ml-270 items-center gap-4 mb-6">

        //         <select
        //             value={startMonth}
        //             onChange={e => setStartMonth(e.target.value)}
        //             className="border px-3 py-2 rounded text-sm"
        //         >
        //             {months.map(m => <option key={m}>{m}</option>)}
        //         </select>

        //         <select
        //             value={endMonth}
        //             onChange={e => setEndMonth(e.target.value)}
        //             className="border px-3 py-2 rounded text-sm"
        //         >
        //             {months.map(m => <option key={m}>{m}</option>)}
        //         </select>

        //         <div className="gap-0">
        //             <button
        //                 onClick={() => setActiveChart("STACKED")}
        //                 className={`px-4 py-2 rounded text-sm border ${activeChart === "STACKED"
        //                     ? "bg-blue-600 text-white"
        //                     : "bg-white"
        //                     }`}
        //             >
        //                 <BarChart2 size={16} />
        //             </button>

        //             <button
        //                 onClick={() => setActiveChart("LINE")}
        //                 className={`px-4 py-2 rounded text-sm border ${activeChart === "LINE"
        //                     ? "bg-blue-600 text-white"
        //                     : "bg-white"
        //                     }`}
        //             >
        //                 <LineChart size={16} />
        //             </button>
        //         </div>


        //     </div>

        //     <div className="flex">
        //         {/* Chart Render */}
        //         {
        //             activeChart === "STACKED" ? (
        //                 <StackedCostChart dataSource={stackedChartConfig} />
        //             ) : (
        //                 <CostTrendLineChart dataSource={lineChartConfig} />
        //             )
        //         }

        //         {/* Filter */}
        //         <div>
        //             <FilterPanel />

        //         </div>
        //     </div>



        // </div >
        <div className="bg-white border rounded-xl shadow-sm p-6">

            {/* GROUP BY – full width */}
            <div className="-mx-6 mb-6 bg-gray-200 border-b">
                <div className="px-6 py-4 flex items-center gap-5">
                    <span className="text-sm font-medium whitespace-nowrap">
                        Group By:
                    </span>

                    <div className="flex flex-wrap gap-2">
                        {groupByOptions.map(option => (
                            <button
                                key={option}
                                onClick={() => setGroupBy(option)}
                                className={`buttonCE ${groupBy === option
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

            {/* MAIN CONTENT AREA */}
            <div className="flex gap-6">

                {/* LEFT SIDE: Controls + Chart */}
                <div className="flex-1">

                    {/* Header + Controls */}
                    <div className="flex items-center gap-4 mb-6">
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

                        {/* Chart Toggle */}
                        <div className="flex border rounded-md overflow-hidden">
                            <button
                                onClick={() => setActiveChart("STACKED")}
                                className={`px-3 py-2 text-sm ${activeChart === "STACKED"
                                        ? "bg-blue-600 text-white"
                                        : "bg-white"
                                    }`}
                            >
                                <BarChart2 size={16} />
                            </button>

                            <button
                                onClick={() => setActiveChart("LINE")}
                                className={`px-3 py-2 text-sm ${activeChart === "LINE"
                                        ? "bg-blue-600 text-white"
                                        : "bg-white"
                                    }`}
                            >
                                <LineChart size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white">
                        {activeChart === "STACKED" ? (
                            <StackedCostChart dataSource={stackedChartConfig} />
                        ) : (
                            <CostTrendLineChart dataSource={lineChartConfig} />
                        )}
                    </div>
                </div>

                {/* RIGHT SIDE: Filters */}
                <div className="w-64 shrink-0">
                    <FilterPanel />
                </div>

            </div>
        </div>

    );
}

export default CostExplorerChart;
