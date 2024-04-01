import { Card, CardHeader, CardBody, Heading } from "@chakra-ui/react";
import "./DistrictCard.css";

function DistrictCard({ id, onDistrictChange, isSelected }) {
  const color = isSelected ? "#F7B704" : "white";
  const backgroundColor = isSelected ? "#ffffff" : "#263e44";
  const backgroundSize = isSelected ? "cover" : "contain";

  const handleDistrictChange = (newId) => {
    onDistrictChange(newId);
  };

  return (
    <div
      onClick={() => {
        handleDistrictChange(id);
      }}
      style={{ cursor: "pointer" }}
      className="district-card-container"
    >
      <Card
        width={{ base: "90%", md: "35vw", lg: "12vw" }}
        height={{ base: "90%", md: "15vh", lg: "15vh" }}
        border={"3px solid #263e44"}
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
        sx={{
          background: `url(/src/images/district${id}.png)`,
          backgroundSize: backgroundSize,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: backgroundColor,
        }}
      >
        <CardHeader>
          <Heading as="h3" size={{ base: "md", md: "lg", lg: "xl" }}>
            District {id}
          </Heading>
        </CardHeader>        
      </Card>
    </div>
  );
}

export default DistrictCard;
