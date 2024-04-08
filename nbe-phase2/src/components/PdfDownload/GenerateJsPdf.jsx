// import React from "react";
// import { Button } from "@chakra-ui/react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// const GenerateJsPdf = () => {
//   const handleDownloadPDF = () => {
//     const element = document.documentElement; 
//     if (element) {
//       html2canvas(element).then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF("landscape", "mm", "a2");
//         pdf.addImage(imgData, "PNG", 40, 40);
//         pdf.save("DE's Solar Energy Transition.pdf"); 
//       });
//     }
//   };

//   return (
//     <div onClick={handleDownloadPDF}>
//       <Button colorScheme="blue" variant="solid" size="md" margin={3}>
//         Download as PDF
//       </Button>
//     </div>
//   );
// };

// export default GenerateJsPdf;



import React from "react";
import { Button } from "@chakra-ui/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const GenerateJsPdf = () => {
  const handleDownloadPDF = () => {
    html2canvas(document.body, {
      scale: 1,
      windowHeight: document.documentElement.scrollHeight,
      scrollY: window.scrollY,
      scrollX: window.scrollX,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // scale image height according to A4 width
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("DE's Solar Energy Transition.pdf");
    });
  };

  return (
    <div>
      <Button
        colorScheme="blue"
        variant="solid"
        size="md"
        margin={3}
        onClick={handleDownloadPDF}
      >
        Download as PDF
      </Button>
    </div>
  );
};

export default GenerateJsPdf;



