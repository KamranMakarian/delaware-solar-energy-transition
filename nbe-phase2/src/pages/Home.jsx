import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import DistrictCard from "../components/DistrictCard/DistrictCard";
import districtData from "../data/district.json";
import "./Home.css";
import { predict } from "../api/predict";
import RechartsLineChart from "../components/LineChart/RechartsLineChart";
// import LegendIcon from "../components/Legend/LegendIcon";
import Loader from "../components/Loader/Loader";
// import GenerateJsPdf from "../components/PdfDownload/GenerateJsPdf";

function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [districtId, setDistrictId] = useState(3);

  const handleDistrictChange = (id) => {
    setDistrictId(id);
  };

  

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const result = await predict(districtId);
        setData(result);
      } catch (error) {
        console.error(error.toString());
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [districtId]);

  return (
    <div className="home-container" id="home-container">
      <Header />
      <div className="district-cards-container">
        {districtData.map((districtData) => {
          return (
            <DistrictCard
              key={districtData.id}
              id={districtData.id}
              onDistrictChange={handleDistrictChange}
              isSelected={districtData.id === districtId}
            />
          );
        })}
      </div>
      <div className="home-spinner-container">
        {loading && !data && <Loader />}
      </div>

      <div className="home-viz-container" id="home-viz-container">
        {!loading && data && (
          <>
            {/* <LegendIcon />     */}
            {/* <GenerateJsPdf />         */}
            <RechartsLineChart
              data={data}
              fieldToPlot={"system_count"}
              yAxisLabel={"System Count"}
              chartTitle={"Analyzing System Count Trends: Historical Data and Projections"}
            />
            <RechartsLineChart
              data={data}
              fieldToPlot={"rebate"}
              yAxisLabel={"Total Dollar Amount"}
              chartTitle={"Dollar Amounts in Rebate Trends: Historical vs. Predicted Data"}
            />
            <RechartsLineChart
              data={data}
              fieldToPlot={"tech_cost($/W)"}
              yAxisLabel={"Cost per Watt"}
              chartTitle={"Technology Expenditures: Historical and Projected Data"}
            />
            <RechartsLineChart
              data={data}
              fieldToPlot={"rebate_eff(W/$)"}
              yAxisLabel={"Rebate Efficiency"}
              chartTitle={"Rebate Efficiency Analysis: Examining Past and Projected Performance"}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
