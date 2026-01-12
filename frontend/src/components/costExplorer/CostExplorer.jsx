import React, { useState } from "react";
import StackedCostChart from "./StackedCostChart";
import CostTrendLineChart from "./CostTrendLineChart";
import { costExplorerData } from "./CostExplorerDummyData";
import CostExplorerChart from "./CostExplorerChart";

function CostExplorer() {
  return (
    <div>
      <h1 className = "text-xl font-bold">Cost Explorer</h1>
      <h4 className = "mb-10">How to always be aware of cost changes and history</h4>

      <CostExplorerChart/>
    </div>
  );
}

export default CostExplorer;

