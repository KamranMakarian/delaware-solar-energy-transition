import React from "react";
import "./Header.css";
import { Button } from "@chakra-ui/react";

function Header() {
  return (
    <div className="header">
      <div className="header-title">
        <h1>
          Visualizing Delaware's Solar Energy Transition
          {/* <svg
            width="25"
            height="25"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="50" fill="#F8D406" />
          </svg> */}
        </h1>
      </div>
      <Button
        className="about-button"
        backgroundColor="#727845"
        variant="solid"
        size="md"
        color="#FFFFFF" 
        marginLeft="3rem"        
      >
        About this Project
      </Button>
    </div>
  );
}

export default Header;
