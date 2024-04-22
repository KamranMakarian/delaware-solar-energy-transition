import React from "react";
import "./Header.css";
import { Button } from "@chakra-ui/react";
import sun from "../../images/sun.png";
import AboutProject from "../AboutProject/AboutProject";
import AboutUsingChakra from "../AboutProject/AboutUsingChakra";

function Header() {
  return (
    <div className="header-container">
      <div className="header-title">
        <h1>
          Delaware's S
          <img src={sun} alt="Sun Image" className="image-sun" />
          lar Energy Transition: Trends and Projections{" "}
        </h1>
      </div>
      {/* <AboutUsingChakra /> */}
      <div className="button-about-project">
        {/* <InvisibleSpacer /> */}
        {/* <Button
          className="about-button"
          backgroundColor="#727845"
          variant="solid"
          size={{ base: "sm", md: "sm", lg: "md", xl: "md" }}
          color="#FFFFFF"
        > */}
          {/* <p className="about-text">
          About this Project
          </p> */}
          <AboutProject />
        {/* </Button> */}
      </div>
    </div>
  );
}

export default Header;

// function InvisibleSpacer() {
//   return <div className="invisible-spacer" />;
// }
