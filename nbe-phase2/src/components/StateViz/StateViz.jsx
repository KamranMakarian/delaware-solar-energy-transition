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
    }, 1500); // Adjust blinking interval as needed

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <Flex
      className="state-viz-container"
      flexDirection="column"
      h="100vh"
      backgroundImage={delaware}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"contain"}
      _hover={{
        transform: "scale(1.5)",
        transition: "transform 0.5s ease-in-out",
        boxShadow: "2xl",
        cursor: "pointer",
      }}
      onClick={onOpen}
    >
      <Text
        color="black"
        fontSize="4xl"
        textAlign={"center"}
        fontWeight="bold"
        fontStyle={"italic"}
        style={{ textShadow: "0.125em 0.125em 0.125em gray" }}
        position={"relative"}
        top={"2vh"}
        left={"-1vh"}
      >
        Click to view state's data
      </Text>

      <Box
        mb="2"
        position={"relative"}
        top={"8vh"}
        left={"8vw"}
        boxSize={"100%"}
        opacity={blink ? 1 : 0} // Toggle opacity to create blinking effect
        transition="opacity 0.5s ease-in-out" // Smooth transition
      >
        <ArrowRightIcon ref={btnRef} color="gray.700" boxSize="4em" />
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
          <DrawerBody
            display={"flex"}
            flexDirection="row"
            justifyContent={"space-around"}
            flexWrap="wrap"
            style={{ overflowY: "auto", maxHeight: "calc(100vh - 30%)" }}
          >
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
