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
} from "recharts";

function RechartsLineChart({ data, fieldToPlot, chartTitle }) {
  const dataArray = JSON.parse(data);

  const { historicalData, predictionData } = dataArray.reduce(
    (acc, item) => {
      const date = new Date(item.Date);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "short",
      });

      const newData = {
        year: formattedDate,
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
      <ResponsiveContainer height={400}>
        <LineChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            allowDuplicatedCategory={false}
            stroke="black"
          />
          <YAxis stroke="black" />
          <Tooltip content={<CustomTooltip />} />

          <Line
            data={historicalDataToPlot.data}
            type="monotone"
            dataKey="value"
            stroke="#4B0082"
            name={historicalDataToPlot.name}
            strokeWidth={2}
            animationDuration={600}
          />
          <Line
            data={predictionDataToPlot.data}
            type="monotone"
            dataKey="value"
            stroke="#006400"
            strokeWidth={2}
            name={predictionDataToPlot.name}
            animationDuration={3000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RechartsLineChart;

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label-tooltip">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
}
