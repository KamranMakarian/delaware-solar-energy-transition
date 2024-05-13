import React from "react";
import { Button, Tooltip } from "@chakra-ui/react";
import Papa from "papaparse";
import greenCsv from "../../assets/greencsv.png";

const DownloadCSVButton = ({ data }) => {
  const handleDownloadCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Tooltip
      label="Download data to a .csv file."
      aria-label="Download CSV"
      hasArrow
      bg={"black"}
      color={"white"}
    >
      <Button        
        size="lg"
        onClick={handleDownloadCSV}
        colorScheme="transparent"
        backgroundImage={`url(${greenCsv})`}
        backgroundSize="cover"
        mr={5}
        backgroundColor={"whitesmoke"}
      ></Button>
    </Tooltip>
  );
};

export default DownloadCSVButton;
