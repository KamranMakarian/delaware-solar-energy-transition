import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import DistrictCard from "../components/DistrictCard/DistrictCard";
import districtData from "../data/district.json";
import "./Home.css";
import LineChart from "../components/LineChart/LineChart";
import { predict } from "../api/predict";


function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await predict(3);
        setData(result);
      } catch (error) {
        console.error(error.toString());
      }
    }

    fetchData();
  }, []);

  return (
    <div className="home-container">
      <Header />
      <div className="district-cards">
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
        <LineChart />
      </div>
    </div>
  );
}

export default Home;
