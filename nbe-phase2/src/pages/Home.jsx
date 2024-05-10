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
  const [data2, setData2] = useState(null);
  const [districtId, setDistrictId] = useState(3);
  const [selectDistrict, setSelectDistrict] = useState(null);

  const handleDistrictChange = (id) => {
    setDistrictId(id);
  };

  const handleComparison = (id) => {
    setSelectDistrict(id);
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
          {/* {loading && !data2 && <Loader />}      */}
        </Box>
        <Box className="home-content-container" id="home-content-container">
          {!loading && data && (
            <Box>
              <Box className="nav-btn-container">
                <Link href="https://innovation-natural-built-env.pages.dev/">
                  <Button
                    bg="#717744"
                    margin={3}
                    variant="solid"
                    size="md"
                    color="white"
                    _hover={{
                      transform: "scale(1.15)",
                      transition: "transform 0.5s ease-in-out",
                      border: "2px solid whitesmoke",
                    }}
                  >
                    Historical Visualization
                  </Button>
                </Link>
              </Box>
              <Box
                className="comparison-select-container"
                display={"flex"}
                flexDirection={"row"}
              >
                <ComparisonSelect
                  activeDistrict={districtId}
                  onSelectDistrict={handleComparison}
                />
                {data2 && data2 !== null && (
                  <Box
                    className="legend-container"
                    display={"flex"}
                    flexDirection={"row"}
                    marginLeft={10}
                    backgroundColor={"#f5f5f5"}
                    borderRadius={6}
                    fontWeight={700}
                  >
                    <Box
                      className="legend-initial"
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"space-around"}
                      padding={2}
                      marginLeft={5}
                    >
                      <CircleShape stroke={"#4B0082"} fill={"#4B0082"} />
                      &nbsp;&nbsp;
                      <CircleShape stroke={"#006400"} fill={"none"} />
                      &nbsp;&nbsp;
                      <span>District {districtId}</span>
                    </Box>
                    <Box
                      className="legend-compare"
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"space-around"}
                      padding={2}
                      marginRight={5}
                    >
                      <DiamondShape stroke={"#4B0082"} fill={"none"} />
                      &nbsp;&nbsp;
                      <DiamondShape stroke={"#006400"} fill={"none"} />
                      &nbsp;&nbsp;
                      <span>District {selectDistrict}</span>
                    </Box>
                  </Box>
                )}
              </Box>
              <Box className="home-download-buttons">
                <DownloadCSVButton data={data} />
                <ImageDownloader />
              </Box>
              <Box className="home-viz-container" id="home-viz-container">
                <RechartsLineChart
                  data={data}
                  {...(data2 !== null && { data2 })}
                  id={districtId}
                  compareId={selectDistrict}
                  fieldToPlot={"system_count"}
                  yAxisLabel={"System Count"}
                  yAxisUnit={""}
                  chartTitle={
                    "PV System Count : Historical Trends and Projections"
                  }
                />
                <RechartsLineChart
                  data={data}
                  {...(data2 !== null && { data2 })}
                  id={districtId}
                  compareId={selectDistrict}
                  fieldToPlot={"rebate"}
                  yAxisLabel={"Total Dollar Amount"}
                  yAxisUnit={"$"}
                  chartTitle={
                    "PV Rebate Trends ($) : Historical Trends and Projections"
                  }
                />
                <RechartsLineChart
                  data={data}
                  {...(data2 !== null && { data2 })}
                  id={districtId}
                  compareId={selectDistrict}
                  fieldToPlot={"tech_cost($/W)"}
                  yAxisLabel={"Cost per Watt"}
                  yAxisUnit={"$/W"}
                  chartTitle={
                    "PV Technology Cost ($/W): Historical Trends and Projections"
                  }
                />
                <RechartsLineChart
                  data={data}
                  {...(data2 !== null && { data2 })}
                  id={districtId}
                  compareId={selectDistrict}
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

function DiamondShape({ stroke, fill }) {
  return (
    <svg width="20" height="20" viewBox="0 0 10 10">
      <polygon
        points="5,0 10,5 5,10 0,5"
        fill={fill}
        stroke={stroke}
        stroke-width="1"
      />
    </svg>
  );
}

function CircleShape({ stroke, fill }) {
  return (
    <svg width="20" height="20" viewBox="0 0 10 10">
      <circle
        cx="5"
        cy="5"
        r="4"
        fill={fill}
        stroke={stroke}
        stroke-width="1"
      />
    </svg>
  );
}
