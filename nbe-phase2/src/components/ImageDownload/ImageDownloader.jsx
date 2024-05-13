import React from "react";
import html2canvas from "html2canvas";
import { Button, Box, Tooltip } from "@chakra-ui/react";
import image from "../../assets/image1.png";

class ImageDownloader extends React.Component {
  constructor(props) {
    super(props);
    this.captureRef = React.createRef();
  }

  handleDownload = () => {
    // Use html2canvas to capture the content of the document.body element
    html2canvas(document.body).then((canvas) => {
      // Convert the canvas to a data URL
      const dataURL = canvas.toDataURL("image/png");

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "DE's Solar Energy Transition.png";
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      document.body.removeChild(link);
    });
  };

  render() {
    return (
      <Box>
        {/* This is the content you want to capture */}
        <Box ref={this.captureRef}>{this.props.children}</Box>
        {/* Button to trigger image download */}
        <Tooltip
          label="Download snapshot of the page as .png file."
          aria-label="Download Image"
          hasArrow
          bg={"black"}
          color={"white"}
        >
        <Button
          backgroundImage={`url(${image})`}
          backgroundSize={"cover"}
          colorScheme="transparent"
          size="lg"                 
          onClick={this.handleDownload}
          padding={5}                    
          backgroundColor={"white"}
        ></Button>
        </Tooltip>
      </Box>
    );
  }
}

export default ImageDownloader;
