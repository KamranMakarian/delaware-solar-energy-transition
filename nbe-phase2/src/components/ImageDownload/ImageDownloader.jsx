import React from "react";
import html2canvas from "html2canvas";
import { Button } from "@chakra-ui/react";

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
      <div>
        {/* This is the content you want to capture */}
        <div ref={this.captureRef}>{this.props.children}</div>
        {/* Button to trigger image download */}
        <Button
          colorScheme="blue"
          variant="solid"
          size="md"
          margin={3}
          onClick={this.handleDownload}
        >
          Snapshot To Image
        </Button>
      </div>
    );
  }
}

export default ImageDownloader;
