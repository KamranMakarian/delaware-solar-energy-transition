import React from "react";
import "./Header.css";
import { Button } from "@chakra-ui/react";
import sun from "../../images/sun.png";

function Header() {
  return (
    <div className="header">
      <div className="header-title">
        <h1>Visualizing Delaware's S</h1>
        <img src={sun} alt="Sun Image" className="image-sun" />
        <h1>lar Energy Transition </h1>
      </div>
      <div className="button-about-project">
        <InvisibleSpacer />
      <Button
        className="about-button"
        backgroundColor="#727845"
        variant="solid"
        size="md"
        color="#FFFFFF"
        
      >
        About this Project
      </Button>
      </div>
    </div>
  );
}

export default Header;


function InvisibleSpacer() {
  return <div className="invisible-spacer" />;
}