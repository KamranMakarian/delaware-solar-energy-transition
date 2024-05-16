import React, { useState, useEffect } from "react";
import "./AboutProject.css";
import christy from "../../assets/christy.jpg";
import danny from "../../assets/danny.jpg";
import dharneesh from "../../assets/dharneesh.jpg";
import kamran from "../../assets/kamran.jpg";
import logo from "../../assets/ti-logo.png";
import { BsFillInfoCircleFill } from "react-icons/bs";
import linkedinlogo from "../../assets/LinkedIn.png";
import { Box } from "@chakra-ui/react";

function AboutProject() {
  const members = [
    {
      name: "Kamran Makarian",
      img: kamran,
      role: "Data Scientist Fellow",
      github: "",
      linkedin: "https://www.linkedin.com/in/kamranmakarian/",
    },
    {
      name: "Dharneeshkar Jayaprakash",
      img: dharneesh,
      role: "Data Engineer",
      github: "",
      linkedin: "https://www.linkedin.com/in/dharneeshkar/",
    },
    {
      name: "Christy Gumban-Grothues",
      img: christy,
      role: "Front-End Data Visualization Fellow",
      github: "",
      linkedin: "https://www.linkedin.com/in/christy-gumban-grothues/",
    },
    {
      name: "Leobardo D. Martinez-Quiroz",
      img: danny,
      role: "Front-End Data Visualization Fellow",
      github: "",
      linkedin: "https://www.linkedin.com/in/leobardo-martinez/",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeButton, setActiveButton] = useState(0);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 932);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderInformation = () => {
    switch (activeButton) {
      case 0:
        return (
          <>
            <Box className="main-body">
              <h3 className="desktop-note">
                <strong style={{ color: "red" }}>NOTE: </strong> Best viewed in
                desktop version
              </h3>
              <br />
              <p>
                Welcome to "Delaware’s Solar Energy Transition: Trends and
                Projections". This dashboard provides a detailed look at the
                evolution of solar energy and the distribution of Green Energy
                Program Grants across Delaware state and the state legislative
                districts that have been receiving rebate applications every
                month since January 2022. We track this progress using four key
                metrics:
              </p>
              <br />
              <ul>
                <li>
                  {" "}
                  <strong style={{ color: "#717744" }}>
                    PV System Count:
                  </strong>{" "}
                  This metric accounts for the total number of photovoltaic
                  solar panel installations that have been registered for
                  rebates within the specified timeframe.
                </li>
                <br />
                <li>
                  {" "}
                  <strong style={{ color: "#717744" }}>
                    PV Rebate Amount:
                  </strong>{" "}
                  Represents the total dollar amount of rebates requested for
                  the installation of solar panel systems during the selected
                  period.
                </li>
                <br />
                <li>
                  <strong style={{ color: "#717744" }}>
                    PV Technology Cost:
                  </strong>{" "}
                  Calculated as the cost of the solar panel system ($) divided
                  by its capacity (W), this metric reflects the median
                  technology cost for the timeframe in question. A lower
                  technology cost is generally advantageous.
                </li>
                <br />
                <li>
                  <strong style={{ color: "#717744" }}>
                    PV Rebate Efficiency:
                  </strong>{" "}
                  This is measured as the capacity of the solar panel system (W)
                  divided by the rebate amount ($). It shows the median value of
                  rebate efficiency for the selected period, where higher
                  efficiency is preferred.
                </li>
                <br />
              </ul>
              <p>
                The dashboard displays historical and projected values for these
                metrics in purple and green, respectively, to provide a visual
                representation of the advances in PV technology across the state
                of Delaware as well as the legislative districts most actively
                engaged in this transition.
              </p>
            </Box>
            <Box className="additional-resources">
              <h4>Additional Resources: </h4>
              <p>
                To dive deeper into the Green Energy Program Grants, click{" "}
                <a
                  href="https://dnrec.delaware.gov/climate-coastal-energy/renewable/assistance/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .{" "}
              </p>
              {/* <p>
                To access U.S. Census, click{" "}
                <a
                  href="https://www.census.gov/en.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .{" "}
              </p> */}
              <p>
                To discover more about the Tech Impact Data Innovation Lab,
                click{" "}
                <a
                  href="https://techimpact.org/datalab"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .{" "}
              </p>
              <p>
                If you have questions or would like to give us your feedback,
                please contact us{" "}
                <a
                  href="https://techimpact.org/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .{" "}
              </p>
            </Box>
          </>
        );
      case 1:
        return (
          <Box className="mainBodyTeam">
            {/* <h4>About the Team</h4> */}

            <Box className="bioContainer">
              {members.map((member) => (
                <Bio
                  key={member.id}
                  pictureUrl={member.img}
                  name={member.name}
                  role={member.role}
                  linkedin={member.linkedin}
                />
              ))}
            </Box>

            <img className="logo" src={logo} alt="TI Logo" />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <button className="aboutBtn" onClick={handleOpenModal}>
        {isMobile ? (
          <BsFillInfoCircleFill className="info-icon" />
        ) : (
          "About this Project"
        )}
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Box className="buttonContainer">
          <button
            className={`infoButton ${activeButton === 0 ? "active" : ""}`}
            onClick={() => handleButtonClick(0)}
            autoFocus
          >
            About This Project
          </button>
          <button
            className={`infoButton ${activeButton === 1 ? "active" : ""}`}
            onClick={() => handleButtonClick(1)}
          >
            About the Team
          </button>
        </Box>

        <Box className="sectionInformation">{renderInformation()}</Box>
        <button className="closeBtn" onClick={handleCloseModal}>
          Close
        </button>
      </Modal>
    </>
  );
}

export default AboutProject;

function Bio({ pictureUrl, name, role, linkedin }) {
  return (
    <Box className="bioContainer-member">
      <Box className="biography">
        <img src={pictureUrl} alt="Profile" className="profilePicture" />
        <Box className="biographyContent">
          <Box className="name-container">
            <h2 className="name">{name}</h2>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-container"
            >
              <img
                src={linkedinlogo}
                alt="LinkedIn Logo"
                className="linkedinLogo"
              />
            </a>
          </Box>
          <h3 className="role">{role}</h3>
          {/* <p className={styles.biographyText}>{text}</p> */}
        </Box>
      </Box>
    </Box>
  );
}

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <Box className="modalOverlay" onClick={onClose}>
      <Box className="modalContent" onClick={(e) => e.stopPropagation()}>
        {children}
      </Box>
    </Box>
  );
}
