import React, { useState, useEffect } from "react";
import "./StateLineChart.css";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import HighlightedWord from "../HighlightWord/HighlightWord";
import { Box, filter } from "@chakra-ui/react";

function StateLineChart({
  data,
  data2,
  id,
  compareId,
  fieldToPlot,
  yAxisUnit,
  chartTitle,
}) {
  const dataArray = JSON.parse(data);

  const { historicalDataToPlot, predictionDataToPlot } = groupData({
    data: dataArray,
    fieldToPlot,
    districtId: id,
    desc:"initial"
  });
  

//   const [historicalDataToPlot2, setHistoricalDataToPlot2] = useState(null);
//   const [predictionDataToPlot2, setPredictionDataToPlot2] = useState(null);

//   useEffect(() => {
//     if (data2) {
//       const dataArray2 = JSON.parse(data2);

//       const { historicalDataToPlot, predictionDataToPlot } = groupData({
//         data: dataArray2,
//         fieldToPlot,
//         districtId: compareId,
//         desc:"comparison"
//       });

//       setHistoricalDataToPlot2(historicalDataToPlot);
//       setPredictionDataToPlot2(predictionDataToPlot);
//     }
//   }, [data2]);

  

  return (
    <Box className="stateline-viz-container" id="stateline-viz-container">
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
        <LineChart>
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


          <Line
            data={historicalDataToPlot.data}
            type="monotone"
            dataKey="value"
            fill="#4B0082"
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
            dot={<CircleDot />}
            connectNulls={true}
          />
                    {/* {historicalDataToPlot2 && predictionDataToPlot2 && (
            <>            
              <Line
                data={historicalDataToPlot2.data}
                type="monotone"
                strokeDasharray={"3 3"}
                dataKey="value"
                // fill="#4B0082"
                stroke="#4B0082"
                name={historicalDataToPlot2.name}
                strokeWidth={3}
                animationDuration={600}
                dot={<DiamondDot />}
                activeDot={<DiamondDot />}
              />
              <Line
                data={predictionDataToPlot2.data}
                type="monotone"
                strokeDasharray={"3 3"}
                dataKey="value"
                stroke="#006400"
                strokeWidth={3}
                name={predictionDataToPlot2.name}
                animationDuration={3000}
                dot={<DiamondDot />}
                activeDot={<DiamondDot />}
                connectNulls={true}
              />              
            </>
          )} */}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default StateLineChart;

function CustomTooltip({ active, payload, label, yAxisUnit }) {
  
  const formattedYear = convertDate(label);

  if (active && payload && payload.length) {
    const filteredPayload = payload.filter((entry, index, self) =>
      index === self.findIndex((t) => t.payload.districtId === entry.payload.districtId)
    );
    return (
      <Box className="state-tooltip">
        <p className="label-tooltip">{formattedYear}</p>
        {filteredPayload.map((entry, index) => (
          <p key={index} className="data-tooltip">
            DE State : { `${
              yAxisUnit === "$"
                ? `$${entry.value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                : `${entry.value}${yAxisUnit ? `(${yAxisUnit})` : ""}`
            }`}
          </p>
        ))}
      </Box>
    );
  }
  return null;
}



function formatYAxisTicks(value, yAxisUnit) {
  if (yAxisUnit === "$") {
    const formattedValue = (value / 1000).toFixed(0);
    return `$${formattedValue}K`;
  }
  return value;
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

function groupData({ data, fieldToPlot, districtId, desc }) {
  const { historicalData, predictionData } = data.reduce(
    (acc, item) => {
      const date = new Date(item.Date);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "short",
      });

      const newData = {
        year: formattedDate,
        value: item[fieldToPlot],
        districtId: districtId,
        desc: desc
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

export function  DiamondDot(props) {
  const { cx, cy, stroke, fill } = props;
  const size = 5; // Adjust the size of the diamond as needed

  return (
    <path
      d={`M${cx},${cy - size}L${cx + size},${cy}L${cx},${cy + size}L${
        cx - size
      },${cy}Z`}
      fill={fill}
      stroke={stroke}
    />
  );
}


export function CircleDot(props) {
  const { cx, cy, stroke, fill } = props;
  const size = 4; // Adjust the size of the circle as needed

  return (
    <circle cx={cx} cy={cy} r={size} fill={fill} stroke={stroke} />
  );
} 