import React from "react";
import html2pdf from "html2pdf.js";
import { Button } from "@chakra-ui/react";


function DownloadPDFButton ()  {    

  const handleDownloadPDF = () => {    
    setTimeout(() => {

    const element = document.getElementById("home-viz-container");
    console.log("this element",element);
    const opt = {
      margin: 0.5,
      filename: "DE's Solar Energy Transition.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    };

    html2pdf().from(element).set(opt).save();
    }, 2000);
  }; 

  return (
    // <div onClick={handleDownloadPDF}>
    <Button colorScheme="blue" variant="solid" size="md" onClick={handleDownloadPDF}>Download as PDF</Button>
    // </div>
  );
};

export default DownloadPDFButton;
