import React from "react";
import "./LineChart.css";
import { ResponsiveLine } from "@nivo/line";
import localdata from "../../data/data.json";

function LineChart() {

  const historicalData = localdata
    .filter((item) => item.Prediction_Flag === 0)
    .map((item) => ({
      x: item.Date,
      y: item.system_count,
    }));

  const predictionData = localdata
    .filter((item) => item.Prediction_Flag === 1)
    .map((item) => ({
      x: item.Date,
      y: item.system_count,
    }));

  const chartData = [
    {
      id: "historical",
      data: historicalData,
    },
    {
      id: "prediction",
      data: predictionData,
    },
  ];

  console.log("chartData", chartData);

  return (
    <div>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "X Axis",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Y Axis",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={{ scheme: "category10" }}
        enableGridX={false}
        enableGridY={true}
        enablePoints={false}
        enableArea={true}
        areaOpacity={0.2}
        useMesh={true}
      />
    </div>
  );
}

export default LineChart;
