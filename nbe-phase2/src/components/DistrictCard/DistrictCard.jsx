import { Card, CardFooter, Box, Container } from "@chakra-ui/react";
import "./DistrictCard.css";

function DistrictCard({ id, onDistrictChange, isSelected }) {
  const color = isSelected ? "#ffffff" : "#ffffff";
  const backgroundColor = isSelected ? "#8f8f8f" : "#006400";
  const backgroundSize = isSelected ? "contain" : "contain";
  const backgroundImg = `url(district${id}.png)`;

  const handleDistrictChange = (newId) => {
    onDistrictChange(newId);
  };

  return (
    <Box
      onClick={() => {
        handleDistrictChange(id);
      }}
      style={{ cursor: "pointer" }}
      className="district-card-container"
    >
      <Card
        width={{
          "5xs": "25vw",
          "4xs": "25vw",
          "3xs": "25vw",
          "2xs": "25vw",          
          xs: "25vw",
          sm: "25vw",
          md: "20vw",
          lg: "18vw",
          xl: "12vw",          
          "2xl": "18vw",
          "3xl": "12vw",
          "4xl": "11vw",
        }}
        height={{
          "5xs": "15vh",
          md: "15vh",
          lg: "13vh",
          xl: "15vh",
          lg: "14vh",
          "3xl": "15vh",
          "4xl": "15vh",
        }}
        size="md"
        borderRadius="lg"
        overflow="hidden"
        mt="3"
        mb="3"
        ml="4"
        mr="4"
        color={color}
        _hover={{
          transform: "scale(1.5)",
          transition: "transform 0.5s ease-in-out",
          boxShadow: "2xl",
          cursor: "pointer",
        }}
        sx={{
          backgroundImage: backgroundImg,
          backgroundSize: backgroundSize,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0 40%",
          backgroundColor: backgroundColor,
        }}
      >
        <CardFooter
          as="h4"
          size={{ "5xs": "sm", md: "md", lg: "lg", xl: "xl" }}
          position={{ "5xs": "absolute", md: "absolute" }}
          top={{ "5xs": "0", md: "0", lg: "0", xl: "3" , "4xl": "1"}}
          right="0"
          left={{ "5xs": "0", "2xs": "20", md: "12", lg: "24", xl: "20" , "2xl": "24","4xl": "20" }}
        >
          <Box className="district-card-footer">
            <Container
              className="footer-district"
              fontSize={{ "5xs": "sm", "2xs": "md",xs: "xl", md: "xl", lg: "2xl", xl: "xl", "4xl": "xl" }}
              fontWeight="normal"
            >
              District
            </Container>
            <Container
              className="footer-district-id"
              fontSize={{ "5xs": "md", "2xs":"5xl", xs: "6xl",md: "5xl", lg: "6xl", xl: "5xl" ,"2xl":"6xl", "4xl": "5xl"}}
              fontWeight="bold"
            >
              {id}
            </Container>
          </Box>
        </CardFooter>
      </Card>
    </Box>
  );
}

export default DistrictCard;
