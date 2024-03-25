import React from "react";
import "./LineChart.css";
import { ResponsiveLine } from "@nivo/line";
import localdata from "../../data/data.json";

function LineChart() {

  let data = localdata;

  console.log("data in linechart", data);

  const historicalData = data
    .filter((item) => item.IsPrediction === 0)
    .map((item) => ({
      x: item.Date,
      y: item.system_count,
    }));

  const predictionData = data
    .filter((item) => item.IsPrediction === 1)
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
    <div className="chart-viz-container">
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
        legends={[
          {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
      />
    </div>
  );
}

export default LineChart;

function formatDate({ date }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "2-digit",
    month: "short",
    day: "numeric",
  });

  return formattedDate;
}
