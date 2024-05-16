import "./StateViz.css";
import React, { useState, useEffect } from "react";
import delaware from "../../assets/DE.png";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  Box,
  Text,
  Center,
  Stat,
  Image,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import DownloadCSVButton from "../CsvDownload/CsvDownload";
import StateLineChart from "../StateLineChart/StateLineChart";
import CustomLineChart from "../CustomLineChart/CustomLineChart";

function StateViz({ stateData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prevBlink) => !prevBlink);
    }, 1500); // Adjust blinking interval as needed

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <Flex
      className="state-viz-container"
      flexDirection="column"
      h="100vh"
      _hover={{
        transform: "scale(1.15)",
        transition: "transform 0.5s ease-in-out",        
        cursor: "pointer",
      }}
      onClick={onOpen}
      boxSize={"15%"}
    >
      <Text
        color="black"
        fontSize="4xl"
        textAlign={"center"}
        fontWeight="bold"
        fontStyle={"italic"}
        style={{ textShadow: "0.125em 0.125em 0.125em gray" }}
        position={"relative"}
        top={"-2vh"}
        left={"-1vh"}
      >
        Click to view state's data
      </Text>

      <Box
        display={"flex"}
        flexDirection={"row"}
        mb="2"
        position={"relative"}
        top={"1vh"}
        left={"0"}
        boxSize={"100%"}
        transition="opacity 0.5s ease-in-out" // Smooth transition

      >
        <Image
          src={delaware}
          alt="Delaware Map"
          boxSize={"60vh"}
          style={{
            filter: "drop-shadow(0.8em 1.2em 1em rgba(0, 0, 0, 1.5))",
          }}
          position={"relative"}
          top={"-2vh"}
          left={"1vh"}
        />
        <ArrowRightIcon
          position={"relative"}
          top={"8vh"}
          left={"-8vh"}
          opacity={blink ? 1 : 0} // Toggle opacity to create blinking effect
          ref={btnRef}
          color="gray.700"
          boxSize="4em"
        />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"full"}
      >
        <DrawerOverlay />

        <DrawerContent
          className="drawer-content"
          containerProps={{
            width: "97%",
            top: "18.5%",
          }}
          style={{ position: "absolute" }}
          bg="#669DA6"
        >
          <DrawerHeader
            display={"flex"}
            flexDirection="row"
            alignItems={"center"}
          >
            <Box>Delaware State Overall Trends and Projections</Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              style={{
                position: "absolute",
                left: "68%",
              }}
            >
              <DownloadCSVButton data={stateData} />
              {/* <ImageDownloader /> */}
            </Box>
          </DrawerHeader>
          <DrawerCloseButton
            size="lg"
            color="white"
            _hover={{
              bg: "white",
              color: "blue.500",
              boxShadow: "0px 0px 10px 2px rgba(255,255,255,0.7)",
            }}
            _focus={{ boxShadow: "0px 0px 10px 2px rgba(255,255,255,0.7)" }}
          />

          <DrawerBody
            display={"flex"}
            flexDirection="row"
            justifyContent={"space-around"}
            flexWrap="wrap"
            style={{ overflowY: "auto", maxHeight: "calc(100vh - 30%)" }}
          >
            <StateLineChart
              data={stateData}
              id={0}
              fieldToPlot={"system_count"}
              yAxisLabel={"System Count"}
              yAxisUnit={""}
              chartTitle={"PV System Count : Historical Trends and Projections"}
            />
            <StateLineChart
              data={stateData}
              id={0}
              fieldToPlot={"rebate"}
              yAxisLabel={"Total Dollar Amount"}
              yAxisUnit={"$"}
              chartTitle={
                "PV Rebate Trends ($) : Historical Trends and Projections"
              }
            />
            <CustomLineChart
              data={stateData}
              id={0}
              topField={"tech_cost($/W)_p75"}
              middleField={"tech_cost($/W)"}
              bottomField={"tech_cost($/W)_p25"}
              yAxisLabel={"Cost per Watt"}
              yAxisUnit={"$/W"}
              chartTitle={
                "PV Technology Cost ($/W): Historical Trends and Projections"
              }
            />
            <CustomLineChart
              data={stateData}
              id={0}
              topField={"rebate_eff(W/$)_p75"}
              middleField={"rebate_eff(W/$)"}
              bottomField={"rebate_eff(W/$)_p25"}
              yAxisLabel={"Rebate Efficiency"}
              yAxisUnit={"W/$"}
              chartTitle={
                "PV Rebate Efficiency (W/$) : Historical Trends and Projections"
              }
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default StateViz;
