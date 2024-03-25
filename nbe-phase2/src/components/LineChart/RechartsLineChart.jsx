import React from "react";
import "./RechartsLineChart.css";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import localdata from "../../data/data.json";

function RechartsLineChart({fieldToPlot, yAxisLabel, chartTitle}) {

  let data = localdata;
//   let fieldToPlot = "system_count";
  let xAxisLabel = "Time";
//   let yAxisLabel = "System Count";
//   let chartTitle = "System Count: Historical and Predicted Data";

  const { historicalData, predictionData } = data.reduce(
    (acc, item) => {
      const newData = {
        year: item.Date,
        value: item[fieldToPlot],
      };

      if (item.IsPrediction === 0) {
        acc.historicalData.push(newData);
      } else {
        acc.predictionData.push(newData);
      }

      return acc;
    },
    { historicalData: [], predictionData: [] }
  );

  const historicalDataToPlot = {
    name: "historical",
    data: historicalData,
  };

  const predictionDataToPlot = {
    name: "prediction",
    data: predictionData,
  };

  return (
    <div className="recharts-viz-container">
      <h2>{chartTitle}</h2>
      <ResponsiveContainer height={500}>
        <LineChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            allowDuplicatedCategory={false}
            label={{ value: xAxisLabel, position: "insideBottom" }}
          />
          <YAxis
            label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Line
            data={historicalDataToPlot.data}
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            name={historicalDataToPlot.name}
          />
          <Line
            data={predictionDataToPlot.data}
            type="monotone"
            dataKey="value"
            stroke="#82ca9d"
            name={predictionDataToPlot.name}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RechartsLineChart;
