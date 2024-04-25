import React from "react";
import "./Header.css";
import sun from "../../images/sun.png";
import { Box } from "@chakra-ui/react";

function Header() {
  return (
    <Box className="header-container">
      <Box className="header-title">
        <h1>
          Delaware's S
          <img src={sun} alt="Sun Image" className="image-sun" />
          lar Energy Transition: Trends and Projections{" "}
        </h1>
      </Box>
    </Box>
  );
}

export default Header;


