import { Card, CardHeader, CardBody, Heading } from "@chakra-ui/react";
import React, { useState } from "react";

function DistrictCard({ id, onDistrictChange, isSelected}) {
  
  const backgroundColor = isSelected ? "#F7B704" : "#263e44";
  const color = isSelected ? "black" : "white";

  const handleDistrictChange = (newId) => {
    onDistrictChange(newId);
  };

  // const toggleBackgroundColor = () => {
  //   if (id === selectedId) {
  //     setBackgroundColor("#ff6347"); // Change to desired selected color
  //   } else {
  //     setBackgroundColor("#263e44"); // Change to default color
  //   }
  // };

  return (
    <div
      onClick={() => {
        handleDistrictChange(id);
        // toggleBackgroundColor();
      }}
      style={{ cursor: "pointer" }}
    >
      <Card
        backgroundColor={backgroundColor}
        size="md"
        borderRadius="lg"
        overflow="hidden"
        mt="3"
        mb="3"
        ml="6"
        mr="6"
        boxShadow="lg"
        color={color}
        _hover={{
          transform: "scale(1.5)",
          transition: "transform 0.5s ease-in-out",
          boxShadow: "2xl",
          cursor: "pointer",
        }}
      >
        <CardHeader>
          <Heading as="h3" size="xl">
            District {id}
          </Heading>
        </CardHeader>
        <CardBody></CardBody>
      </Card>
    </div>
  );
}

export default DistrictCard;
