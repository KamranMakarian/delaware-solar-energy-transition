import React from "react";
import { Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <div className="loading-spinner">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        label="Loading..."
        colorScheme="whatsapp"
      />
    </div>
  );
};

export default Loader;
