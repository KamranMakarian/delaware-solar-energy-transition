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
  Button,
  Card,
  Flex,
  Center,
  Box,
  Text,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import RechartsLineChart from "../LineChart/RechartsLineChart";

function StateViz({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prevBlink) => !prevBlink);
    }, 1000); // Adjust blinking interval as needed

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <Flex
      className="state-viz-container"
      flexDirection="column"
      size="xl"
      // align={"top"}
      justify={"top"}
      h="62vh"
      backgroundImage={delaware}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"contain"}
    >
      <Text
        position={"absolute"}
        top={"3vh"}
        left={"0vw"}
        color="white"
        fontSize="sm"
        fontWeight="bold"
      >
        Click to view state's data
      </Text>
      <Box
        mb="2"
        position={"absolute"}
        top={"6vh"}
        left={"5vw"}
        onClick={onOpen}
        boxSize={"100%"}
        style={{ cursor: "pointer" }}
        opacity={blink ? 1 : 0} // Toggle opacity to create blinking effect
        transition="opacity 0.5s ease-in-out" // Smooth transition
      >
        <ArrowRightIcon ref={btnRef} color="gray.700" boxSize="6em" />
      </Box>
      <svg
        viewBox="0 0 10 100" // Adjust the viewBox according to the desired wave shape
        preserveAspectRatio="none"
        fill="currentColor"
        style={{
          position: "absolute",
          top: 0,
          left: 220,
          width: "10px", // Adjust the width to match the content
          height: "100%",
          zIndex: 1, // Ensure the SVG is above the content
        }}
      >
        <path
          d="M 0 50
             C 25 60, 75 60, 100 50
             S 175 40, 200 50
             V 100 H 0 Z"
        />
      </svg>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"full"}
        isFullHeight={true}
      >
        <DrawerOverlay />
        <DrawerContent
          containerProps={{
            h: "auto",
            width: "98%",
            top: "18.5%",
          }}
          style={{ position: "absolute" }}
          bg="gray.500"
        >
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
          <DrawerHeader>State of Delaware Solar Energy Transition</DrawerHeader>
          <DrawerBody display={"flex"} flexDirection="row" flexWrap="wrap">
          
            <RechartsLineChart
              data={data}
              id={13}
              fieldToPlot={"system_count"}
              yAxisLabel={"System Count"}
              yAxisUnit={""}
              chartTitle={"PV System Count : Historical Trends and Projections"}
            />
            <RechartsLineChart
              data={data}
              id={13}
              fieldToPlot={"rebate"}
              yAxisLabel={"Total Dollar Amount"}
              yAxisUnit={"$"}
              chartTitle={
                "PV Rebate Trends ($) : Historical Trends and Projections"
              }
            />
            <RechartsLineChart
              data={data}
              id={13}
              fieldToPlot={"tech_cost($/W)"}
              yAxisLabel={"Cost per Watt"}
              yAxisUnit={"$/W"}
              chartTitle={
                "PV Technology Cost ($/W): Historical Trends and Projections"
              }
            />
            <RechartsLineChart
              data={data}
              id={13}
              fieldToPlot={"rebate_eff(W/$)"}
              yAxisLabel={"Rebate Efficiency"}
              yAxisUnit={"W/$"}
              chartTitle={
                "PV Rebate Efficiency (W/$) : Historical Trends and Projections"
              }
            />            
          </DrawerBody>

          <DrawerFooter>This is the footer</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default StateViz;
