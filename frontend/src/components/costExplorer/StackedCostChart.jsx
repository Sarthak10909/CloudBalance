import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";

Charts(FusionCharts);

function StackedCostChart({ dataSource }) {
  return (
    <ReactFC
      type="stackedcolumn2d"
      width="100%"
      height="420"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
}

export default StackedCostChart;
