import React from "react";
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import "./CustomLineChart.css";
import { Box } from "@chakra-ui/react";
import HighlightedWord from "../HighlightWord/HighlightWord";

function AreaChartExample({
  data,
  id,
  topField,
  middleField,
  bottomField,
  yAxisUnit,
  chartTitle,
}) {
  const dataArray = JSON.parse(data);

  const { historicalDataToPlot, predictionDataToPlot } = groupData({
    data: dataArray,
    topField,
    middleField,
    bottomField,
    districtId: id,
    desc: "initial",
  });

  console.log(historicalDataToPlot, "historicalDataToPlot");

  return (
    <Box className="custom-chart-container">
      <h2>
        <HighlightedWord
          text={chartTitle}
          wordToHighlight1={"Historical"}
          highlightColor1={"#4B0082"}
          wordToHighlight2={"Projections"}
          highlightColor2={"#006400"}
        />
      </h2>
      <ResponsiveContainer height={350}>
        <ComposedChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            allowDuplicatedCategory={false}
            stroke="black"
            fontSize={12}
            fontWeight={600}
            angle={-30}
            textAnchor="end"
          />
          <YAxis
            stroke="black"
            tickFormatter={(value) => {
              if (value !== 0) {
                const formattedValue = formatYAxisTicks(value, yAxisUnit);
                return formattedValue !== "0" ? formattedValue : "";
              } else {
                return "";
              }
            }}
          />
          <Tooltip content={<CustomTooltip yAxisUnit={yAxisUnit} id={id} />} />

          <Area
            type="linear"
            data={historicalDataToPlot.data}
            dataKey="top"
            stackId="1"
            stroke="#a9a9a9"
            fill="url(#areaFill)"
          />
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a9a9a9" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#a9a9a9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Line
            type="linear"
            data={historicalDataToPlot.data}
            dataKey="middle"
            stroke="#4B0082"
            strokeWidth={2}
            fill="#4B0082"
          />
          <Area
            type="linear"
            data={historicalDataToPlot.data}
            dataKey="bottom"
            stackId="1"
            stroke="#a9a9a9"
            fill="transparent"
            // fill="url(#areaFill)"
          />
          <Line
            type="linear"
            data={predictionDataToPlot.data}
            dataKey="middle"
            stroke="#006400"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default AreaChartExample;

function groupData({
  data,
  topField,
  middleField,
  bottomField,
  districtId,
  desc,
}) {
  const { historicalData, predictionData } = data.reduce(
    (acc, item) => {
      const date = new Date(item.Date);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "short",
      });

      // If historical data for the year exists, update it; otherwise, push a new entry
      if (item.IsPrediction === 0) {
        const existingYearData = acc.historicalData.find(
          (entry) => entry.year === formattedDate
        );

        if (existingYearData) {
          existingYearData.range = [item[bottomField], item[topField]];
          existingYearData.top = item[topField];
          existingYearData.middle = item[middleField];
          existingYearData.bottom = item[bottomField];
        } else {
          acc.historicalData.push({
            year: formattedDate,
            range: [item[bottomField], item[topField]],
            top: item[topField],
            middle: item[middleField],
            bottom: item[bottomField],
            districtId: districtId,
            desc: "historical",
          });
        }
      } else {
        // If prediction data for the year exists, update it; otherwise, push a new entry
        const existingYearData = acc.predictionData.find(
          (entry) => entry.year === formattedDate
        );

        if (existingYearData) {
          existingYearData.middle = item[middleField];
        } else {
          acc.predictionData.push({
            year: formattedDate,
            middle: item[middleField],
            districtId: districtId,
            desc: "prediction",
          });
        }
      }

      return acc;
    },

    { historicalData: [], predictionData: [] }
  );

  const historicalDataToPlot = {
    name: "historical",
    data: historicalData,
  };

  const lastHistoricalData =
    historicalDataToPlot.data.length > 0
      ? historicalDataToPlot.data[historicalDataToPlot.data.length - 1]
      : null;

  const predictionDataToPlot = {
    name: "prediction",
    data: predictionData,
  };

  if (lastHistoricalData !== null) {
    predictionDataToPlot.data.unshift(lastHistoricalData);
  }

  return { historicalDataToPlot, predictionDataToPlot };
}

function formatYAxisTicks(value, yAxisUnit) {
  if (yAxisUnit === "$") {
    const formattedValue = (value / 1000).toFixed(0);
    return `$${formattedValue}K`;
  }
  return value;
}

function CustomTooltip({ active, payload, label, yAxisUnit }) {
  const formattedYear = convertDate(label);

  const getQuartileLabel = (quartile) => {
    quartile = quartile.toLowerCase();
    if (quartile === "top") {
      return "Upper Quartile";
    } else if (quartile === "middle") {
      return "Median";
    } else if (quartile === "bottom") {
      return "Lower Quartile";
    } else {
      return "Invalid input";
    }
  };

  if (active && payload && payload.length) {
    return (
      <Box className="custom-tooltip">
<p className="label-tooltip">{formattedYear}</p>

{payload.map((entry, index) => (
          <p key={index} className="data-tooltip">
            DE State :{" "} 
            {`${entry.payload.desc === "historical" ? `Historical - ${getQuartileLabel(entry.name)}` : "Projections"}`} :


            {` ${
              yAxisUnit === "$"
                ? `$${entry.value
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                : `${entry.value}${yAxisUnit ? `(${yAxisUnit})` : ""}`
            }`}
          </p>
        ))}
      </Box>
    );
  }
  return null;
}

function convertDate(label) {
  // Split the original date string into month and year parts
  const [month, year] = String(label).split(" ");

  // Create a JavaScript Date object using only the month part and any arbitrary day (e.g., 1)
  const date = new Date(`${month} 1, ${year}`);

  // Format the month to full month name (e.g., "June") and format the year
  const formattedMonth = date.toLocaleString("default", { month: "long" });
  const formattedYear = date.getFullYear();

  // Return the formatted date string
  return `${formattedMonth} ${formattedYear}`;
}
