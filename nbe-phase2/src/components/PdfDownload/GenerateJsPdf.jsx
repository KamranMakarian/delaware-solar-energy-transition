import React from "react";
import { Button } from "@chakra-ui/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const GenerateJsPdf = () => {
  const handleDownloadPDF = () => {    

    const element = document.getElementById("home-viz-container");
    console.log("this element",element);

    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape");
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save("DE's Solar Energy Transition.pdf"); // Save the PDF with a custom filename
      });
    }
  };

  return (
    <div onClick={handleDownloadPDF}>
      <Button colorScheme="blue" variant="solid" size="md">
        Download as PDF
      </Button>
    </div>
  );
};

export default GenerateJsPdf;
