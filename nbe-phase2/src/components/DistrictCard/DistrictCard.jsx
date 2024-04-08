import { Card, CardFooter } from "@chakra-ui/react";
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
        width={{ base: "25vw", md: "20vw", lg: "15vw", xl: "12vw"}}
        height={{ base: "15vh", md: "15vh", lg: "15vh", xl: "15vh"}}
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
          background: `url(/src/assets/district${id}.png)`,
          backgroundSize: backgroundSize,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "5% 40%",
          backgroundColor: backgroundColor,
        }}
      >
        <CardFooter
          as="h4"
          size={{ base: "sm", md: "md", lg: "lg" , xl: "xl"}}
          style={{ position: "absolute", bottom: "0", right: "0" }}
        >
          <div className="district-card-footer">
          <p>District</p>
          <p className="footer-district-id">{id}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default DistrictCard;
