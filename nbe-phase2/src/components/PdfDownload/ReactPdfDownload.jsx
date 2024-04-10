import generatePDF, {Resolution, Margin} from "react-to-pdf";
import { Button } from "@chakra-ui/react";

function ReactPdfDownload() {
  const options = {
    filename: "report.pdf",
    method: "save",
    resolution: Resolution.EXTREME,
    page: {
      margin: Margin.SMALL,
      format: "letter",
      orientation: "landscape",
    },
    canvas: {
      mimeType: "image/jpeg",
      qualityRatio: 1,
    },
    overrides: {
      pdf: {
        compress: true,
      },
      canvas: {
        useCORS: true,
      },
    },
  };

const getTargetElement = () => {
    return document.body;

    // return document.querySelector(".home-viz-container");
    // const elements = document.querySelectorAll(".recharts-viz-container");
    // console.log(elements);
    // return Array.from(elements);
};

  const downloadPDF = async () => {
    return generatePDF(getTargetElement, options);
  };

  return (
    <div>
      <Button
        colorScheme="blue"
        variant="solid"
        size="md"
        margin={3}
        onClick={downloadPDF}
      >
        Snapshot to PDF
      </Button>
    </div>
  );
}

export default ReactPdfDownload;
