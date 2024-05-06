import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import DistrictCard from "../components/DistrictCard/DistrictCard";
import districtData from "../data/district.json";
import "./Home.css";
import { predict } from "../api/predict";
import RechartsLineChart from "../components/LineChart/RechartsLineChart";
import Loader from "../components/Loader/Loader";
import DownloadCSVButton from "../components/CsvDownload/CsvDownload";
import AboutProject from "../components/AboutProject/AboutProject";
import ImageDownloader from "../components/ImageDownload/ImageDownloader";
import { Button, Link, Box, Flex, Card } from "@chakra-ui/react";
import StateViz from "../components/StateViz/StateViz";
import ComparisonSelect from "../components/ComparisonSelect/ComparisonSelect";

function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [districtId, setDistrictId] = useState(3);
  const [data2, setData2] = useState(null);
  const [selectDistrict, setSelectDistrict] = useState(null);

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

 //Fetch data for comparison district
  useEffect(() => {
    async function fetchData() {
    if (!selectDistrict) return;
      setLoading(true);
      try {
        const result = await predict(selectDistrict);
        setData2(result);
      } catch (error) {
        console.error(error.toString());
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [selectDistrict]);

  const handleSelectDistrict = (id) => {
    setSelectDistrict(id);
  };

  console.log("second data",data2);

  return (
    <Box className="home-container" id="home-container">
      <Header />
      <AboutProject />

      <Box className="bottom-container">
        <StateViz data={data} />
        <Flex
          className="district-cards-container"
          overflowX="scroll"
          overflowY="hidden"
          position="fixed"
          top="18%"
          left="13%"
          width="87%"
        >
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
        </Flex>

        <Box className="home-spinner-container">
          {loading && !data && <Loader />}
        </Box>
        <Box className="home-content-container" id="home-content-container">
          {!loading && data && (
            <Box>
              <Box className="nav-btn-container">
                <Link href="https://innovation-natural-built-env.pages.dev/">
                  <Button
                    colorScheme="orange"
                    margin={3}
                    variant="solid"
                    size="md"
                  >
                    Navigate To Historical Visualization Dashboard
                  </Button>
                </Link>
              </Box>
              <Box className="home-download-buttons">
                <DownloadCSVButton data={data} />
                <ImageDownloader />
                <ComparisonSelect
                  activeDistrict={districtId}
                  onSelectDistrict={handleSelectDistrict}
                />
              </Box>
              <Box className="home-viz-container" id="home-viz-container">
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
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
