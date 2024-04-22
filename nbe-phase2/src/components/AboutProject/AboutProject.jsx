import React, { useState, useEffect } from "react";
import "./AboutProject.css";
import christy from "../../assets/christy.jpg";
import danny from "../../assets/danny.jpg";
import dharneesh from "../../assets/dharneesh.jpg";
import kamran from "../../assets/kamran.jpg";
import nile from "../../assets/nile.jpg";
import logo from "../../assets/ti-logo.png";
import { BsFillInfoCircleFill } from "react-icons/bs";


function AboutProject() {
  const members = [
    {
      name: "Christy Grothues",
      img: christy,
      role: "Frontend Data Visualization Fellow",
      github: "",
      linkedin: "",
    },
    {
      name: "Leobardo D. Martinez-Quiroz",
      img: danny,
      role: "Frontend Data Visualization Fellow",
      github: "",
      linkedin: "",
    },
    {
      name: "Dharneeshkar Jayaprakash",
      img: dharneesh,
      role: "Data Engineer",
      github: "",
      linkedin: "",
    },
    {
      name: "Kamran Makarian",
      img: kamran,
      role: "Data Scientist Fellow",
      github: "",
      linkedin: "",
    },
    {
      name: "Nile Reed Miller",
      img: nile,
      role: "Frontend Developer",
      github: "",
      linkedin: "",
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
      setIsMobile(window.innerWidth <= 450);
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
            <div className="main-body">
              <p>
                Welcome to Delaware’s Solar Energy Transition dashboard, which
                offers a clear picture of how solar energy is evolving and how
                Green Energy Program Grants are being distributed in Delaware.
                Presented herein are two comprehensive and easy-to-understand
                maps that break down important information by each state
                legislative district from year 2015 to 2021.
              </p>
              <h4>The data variables include:</h4>
              <ul>
                <li>
                  {" "}
                  <strong style={{ color: "#717744" }}>
                    PV System Cost:
                  </strong>{" "}
                  Represents the aggregate cost of solar panel installations
                  that have been registered for rebates within the time frame
                  specified by the user
                </li>
                <br />
                <li>
                  {" "}
                  <strong style={{ color: "#717744" }}>
                    PV System Count:
                  </strong>{" "}
                  The total number of solar panel installations recorded for
                  rebate consideration within the selected time frame
                </li>
                <br />
                <li>
                  <strong style={{ color: "#717744" }}>
                    PV Rebate Amount:
                  </strong>{" "}
                  The sum of rebates applied for the installation of solar panel
                  systems during the delineated time frame
                </li>
                <br />
                <li>
                  <strong style={{ color: "#717744" }}>PV Capacity:</strong> The
                  combined electrical generation capacity, measured in Watts
                  (W), of all solar panel systems that have been filed for
                  rebate within the chosen time frame
                </li>
                <br />
                <li>
                  <strong style={{ color: "#717744" }}>
                    Solar-Heated Households:
                  </strong>{" "}
                  The count of residences utilizing solar heating solutions
                  within the selected time frame (this metric is confined to the
                  residential sector and is derived from the Census API)
                </li>
                <br />
                <li>
                  <strong style={{ color: "#717744" }}>
                    Solar-Heated Households per 1,000 Households:
                  </strong>{" "}
                  The incidence of solar heating in homes, adjusted against 0.1
                  percent of the total number of households within a district
                  within the selected time frame (this metric is confined to the
                  residential sector and is derived from the Census API)
                </li>
                <br />
                <li>
                  <strong style={{ color: "#717744" }}>
                    Data representation is available in two formats:
                  </strong>{" "}
                  annual and cumulative. The cumulative view aggregates data
                  commencing from the year 2015 to the selected endpoint,
                  thereby illustrating the trajectory of growth.{" "}
                </li>
              </ul>
            </div>
            <div className="additional-resources">
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
              <p>
                To access U.S. Census, click{" "}
                <a
                  href="https://www.census.gov/en.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .{" "}
              </p>
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
            </div>
          </>
        );
      case 1:
        return (
          <div className="mainBodyTeam">
            {/* <h4>About the Team</h4> */}

            <div className="bioContainer">
              {members.map((member) => (
                <Bio
                  key={member.id}
                  pictureUrl={member.pictureUrl}
                  name={member.name}
                  role={member.role}
                />
              ))}
            </div>

            <img className="logo" src={logo} alt="TI Logo" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <button className="aboutBtn" onClick={handleOpenModal}>
        {isMobile ? <BsFillInfoCircleFill size={24} /> : "About this Project"}
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="buttonContainer">
          <button
            className={`infoButton ${activeButton === 0 ? "active" : ""}`}
            onClick={() => handleButtonClick(0)}
            autoFocus
          >
            About This Project
          </button>
          <button
            className={`infoButton ${activeButton === 0 ? "active" : ""}`}
            onClick={() => handleButtonClick(1)}
          >
            About the Team
          </button>
        </div>

        <div className="sectionInformation">{renderInformation()}</div>
        <button className="closeBtn" onClick={handleCloseModal}>
          Close
        </button>
      </Modal>
    </>
  );
}

export default AboutProject;

function Bio({ pictureUrl, name, role }) {
  return (
    <div className="bioContainer">
      <div className="biography">
        <img src={pictureUrl} alt="Profile" className="profilePicture" />
        <div className="biographyContent">
          <h2 className="name">{name}</h2>
          <h3 className="role">{role}</h3>
          {/* <p className={styles.biographyText}>{text}</p> */}
        </div>
      </div>
    </div>
  );
}

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
