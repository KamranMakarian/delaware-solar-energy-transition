import React from "react";
import { Button } from "@chakra-ui/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const GenerateJsPdf = () => {
  const handleDownloadPDF = () => {
    const element = document.body;   

    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "mm", "a2");

        pdf.addImage(imgData, "PNG", 40, 40);
        pdf.save("DE's Solar Energy Transition.pdf"); 
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
