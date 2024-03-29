import React from "react";
import { Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
      label="Loading..."
      colorScheme="whatsapp"
    />
  );
};

export default Loader;
