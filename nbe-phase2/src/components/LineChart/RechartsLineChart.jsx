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
import HighlightedWord from "../HighlightWord/HighlightWord";

function RechartsLineChart({ data, id, fieldToPlot, yAxisUnit, chartTitle }) {
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
    <div className="recharts-viz-container" >
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
          <Tooltip content={<CustomTooltip yAxisUnit={yAxisUnit} id={id}/>} />
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

function CustomTooltip({ active, payload, label, yAxisUnit, id }) {
  
  const formattedYear = convertDate(label);
  
  if (active && payload && payload.length) {
    
    const verbToUse = payload[0].name === "historical" ? "has" : "will have";    
    const dollarValue = payload[0].value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const valueToDisplay = yAxisUnit === "$" ? `$${dollarValue}` : `${payload[0].value}${yAxisUnit ? `(${yAxisUnit})` : ""}`;


    return (
      <div className="custom-tooltip">
        {/* <p className="label-tooltip">{`In ${formattedYear}, District ${id} ${verbToUse} ${valueToDisplay} in ${payload[0].name} data.` }</p> */}
        <p className="label-tooltip">{`${formattedYear} : ${valueToDisplay}` }</p>

      </div>
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
  const [month, year] = String(label).split(' ');

  // Create a JavaScript Date object using only the month part and any arbitrary day (e.g., 1)
  const date = new Date(`${month} 1, ${year}`);

  // Format the month to full month name (e.g., "June") and format the year
  const formattedMonth = date.toLocaleString('default', { month: 'long' });
  const formattedYear = date.getFullYear();

  // Return the formatted date string
  return `${formattedMonth} ${formattedYear}`;
}


