import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";

Charts(FusionCharts);

function CostTrendLineChart({ dataSource }) {
  return (
    <ReactFC
      type="msline"
      width="100%"
      height="420"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
}

export default CostTrendLineChart;
