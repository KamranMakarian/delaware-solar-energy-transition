import React, { useEffect, useRef } from 'react';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { Button, Box } from '@chakra-ui/react';

function ReactPdfDownload() {
  const options = useRef({
    filename: "Delaware's Solar Energy Transition.pdf",
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
      width: window.innerWidth,
      height: 0, // We'll set the height dynamically later
    },
    viewer: {
      zoom: 1,
    },
    overrides: {
      pdf: {
        compress: true,
      },
      canvas: {
        useCORS: true,
      },
    },
  });

  const getTargetElement = () => {
    return document.body;
  };

  useEffect(() => {
    const handleResize = () => {
      options.current.canvas.width = window.innerWidth;
    };

    const handleScroll = () => {
      options.current.canvas.height = document.body.scrollHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // Initial height calculation
    options.current.canvas.height = document.body.scrollHeight;

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const downloadPDF = async () => {
    return generatePDF(getTargetElement, options.current);
  };

  return (
    <Box>
      <Button
        colorScheme="blue"
        variant="solid"
        size="md"
        margin={3}
        onClick={downloadPDF}
      >
        Snapshot to PDF
      </Button>
    </Box>
  );
}

export default ReactPdfDownload;
