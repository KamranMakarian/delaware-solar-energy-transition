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
              id = {districtId}
              fieldToPlot={"system_count"}
              yAxisLabel={"System Count"}
              yAxisUnit={""}
              chartTitle={"System Count Over Time : Historical Data and Projections"}
            />
            <RechartsLineChart
              data={data}
              id = {districtId}
              fieldToPlot={"rebate"}
              yAxisLabel={"Total Dollar Amount"}
              yAxisUnit={"$"}
              chartTitle={"Rebate Trends : Historical and Projections Data"}
            />
            <RechartsLineChart
              data={data}
              id = {districtId}
              fieldToPlot={"tech_cost($/W)"}
              yAxisLabel={"Cost per Watt"}
              yAxisUnit={"$/W"}
              chartTitle={"Technology Cost($/W): Historical Data and Projections"}
            />
            <RechartsLineChart
              data={data}
              id = {districtId}
              fieldToPlot={"rebate_eff(W/$)"}
              yAxisLabel={"Rebate Efficiency"}
              yAxisUnit ={"W/$"}
              chartTitle={"Rebate Efficiency (W/$) : Historical and Projections Data"}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
