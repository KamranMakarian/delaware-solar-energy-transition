import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import DistrictCard from "../components/DistrictCard/DistrictCard";
import districtData from "../data/district.json";
import "./Home.css";
import { predict } from "../api/predict";
import RechartsLineChart from "../components/LineChart/RechartsLineChart";
import Loader from "../components/Loader/Loader";
import DownloadCSVButton from "../components/CsvDownload/CsvDownload";
import GenerateJsPdf from "../components/PdfDownload/GenerateJsPdf";
import ReactPdfDownload from "../components/PdfDownload/ReactPdfDownload";
import AboutProject from "../components/AboutProject/AboutProject";
import ImageDownloader from "../components/ImageDownload/ImageDownloader";
import { Button, Link } from "@chakra-ui/react";

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
      const startTime = new Date().getTime();
      try {
        const result = await predict(districtId);
        setData(result);
      } catch (error) {
        console.error(error.toString());
      } finally {
        setLoading(false);
        const endTime = new Date().getTime();
        console.log(`API call took ${endTime - startTime} ms`);
      }
    }

    fetchData();
  }, [districtId]);

  return (
    <div className="home-container" id="home-container">
      <Header />
      <AboutProject />

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
      <div className="home-content-container" id="home-content-container">
        {!loading && data && (
          <>
            <div className="nav-btn-container">
              <Link href="https://innovation-natural-built-env.pages.dev/">
                <Button colorScheme="orange" margin={3} variant="solid">
                  Navigate To Historical Visualization Dashboard
                </Button>
              </Link>
            </div>
            <div className="home-download-buttons">
              <DownloadCSVButton data={data} />
              {/* <GenerateJsPdf /> */}
              {/* <ReactPdfDownload /> */}
              <ImageDownloader />
            </div>
            <div className="home-viz-container" id="home-viz-container">
              <RechartsLineChart
                data={data}
                id={districtId}
                fieldToPlot={"system_count"}
                yAxisLabel={"System Count"}
                yAxisUnit={""}
                chartTitle={
                  "PV System Count : Historical Trends and Projections"
                }
              />
              <RechartsLineChart
                data={data}
                id={districtId}
                fieldToPlot={"rebate"}
                yAxisLabel={"Total Dollar Amount"}
                yAxisUnit={"$"}
                chartTitle={
                  "PV Rebate Trends ($) : Historical Trends and Projections"
                }
              />
              <RechartsLineChart
                data={data}
                id={districtId}
                fieldToPlot={"tech_cost($/W)"}
                yAxisLabel={"Cost per Watt"}
                yAxisUnit={"$/W"}
                chartTitle={
                  "PV Technology Cost ($/W): Historical Trends and Projections"
                }
              />
              <RechartsLineChart
                data={data}
                id={districtId}
                fieldToPlot={"rebate_eff(W/$)"}
                yAxisLabel={"Rebate Efficiency"}
                yAxisUnit={"W/$"}
                chartTitle={
                  "PV Rebate Efficiency (W/$) : Historical Trends and Projections"
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
