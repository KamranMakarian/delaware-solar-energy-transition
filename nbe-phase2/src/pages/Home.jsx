import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import DistrictCard from "../components/DistrictCard/DistrictCard";
import districtData from "../data/district.json";
import "./Home.css";
// import NivoLineChart from "../components/LineChart/NivoLineChart";
import { predict } from "../api/predict";
import RechartsLineChart from "../components/LineChart/RechartsLineChart";
import LegendIcon from "../components/Legend/LegendIcon";
import { Flex } from "@chakra-ui/react"; 

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await predict(3);
        setData(result);
        console.log("result at home", result);
      } catch (error) {
        console.error(error.toString());
      }
    }

    fetchData();
  }, []);

  return (
    <div className="home-container">
      <Header />
      <div className="district-cards-container">
        {/* <Flex overflowX="auto" justify="center" flexDirection="row" maxWidth="100%" whiteSpace="nowrap"> */}
        {districtData.map((districtData) => {
          return (
            <DistrictCard
              key={districtData.id}
              id={districtData.id}
              memberName={districtData.memberName}
              party={districtData.party}
              imagePath={districtData.imagePath}
            />
          );
        })}
        {/* </Flex> */}
      </div>
      <LegendIcon />

      <div className="home-viz-container">
        <RechartsLineChart
          fieldToPlot={"system_count"}
          yAxisLabel={"System Count"}
          chartTitle={"System Count: Historical and Predicted Data"}
        />
        <RechartsLineChart
          fieldToPlot={"rebate"}
          yAxisLabel={"Total Dollar Amount"}
          chartTitle={"Rebate: Historical and Predicted Data"}
        />
        <RechartsLineChart
          fieldToPlot={"tech_cost($/W)"}
          yAxisLabel={"Cost per Watt"}
          chartTitle={"Tech Cost: Historical and Predicted Data"}
        />
        <RechartsLineChart
          fieldToPlot={"rebate_eff(W/$)"}
          yAxisLabel={"Rebate Efficiency"}
          chartTitle={"Rebate Efficiency: Historical and Predicted Data"}
        />
      </div>
    </div>
  );
}

export default Home;
