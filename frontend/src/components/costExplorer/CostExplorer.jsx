import React from "react";
import CostExplorerContainer from "./CostExplorerContainer";

function CostExplorer() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-1">Cost Explorer</h1>
      <h4 className="mb-6 text-sm text-gray-500">
        How to always be aware of cost changes and history
      </h4>

      <div className = "">
        <CostExplorerContainer />
      </div>
      
    </div>
  );
}

export default CostExplorer;

// flex-1 max-w-[calc(100vw-330px)]