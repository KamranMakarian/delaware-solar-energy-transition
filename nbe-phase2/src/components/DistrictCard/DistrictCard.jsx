import {
  Card,
  CardFooter,
  Box,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import "./DistrictCard.css";

function DistrictCard({ id, onDistrictChange, isSelected }) {
  const color = isSelected ? "#ffffff" : "#ffffff";
  const backgroundColor = isSelected ? "#8f8f8f" : "#006400";
  const backgroundSize = isSelected ? "contain" : "contain";
  const backgroundImg = `url(district${id}.png)`;
  const hideBgImage = useBreakpointValue({ "9xs": true, "2xs": false });

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
          "3xs": "18vw",
          "2xs": "25vw",
          xs: "25vw",
          sm: "25vw",
          md: "20vw",
          lg: "14vw",
          xl: "12vw",
          "2xl": "18vw",
          "3xl": "12vw",
          "4xl": "11vw",
        }}
        height={{
          "5xs": "13vh",
          "3xs": "11vh",
          md: "15vh",
          lg: "13vh",
          xl: "14.4vh",
          lg: "13vh",
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
          transform: "scale(1.15)",
          transition: "transform 0.5s ease-in-out",
          // boxShadow: "2xl",
          cursor: "pointer",
        }}
        sx={{
          backgroundImage: hideBgImage ? "none" : backgroundImg,
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
          top={{ "5xs": "0", 
          "3xs": "-2",
          "lg": "0",
          "xl": "0",          
          "4xl": "1" }}
          right="0"
          left={{
            "5xs": "0",
            "2xs": "20",
            md: "12",
            lg: "4",
            xl: "8",
            "2xl": "16",
            "4xl": "20",
          }}
        >
          <Box className="district-card-footer">
            <Container
              className="footer-district"
              fontSize={{
                "5xs": "sm",
                "2xs": "md",
                xs: "xl",
                md: "xl",
                lg: "xl",
                xl: "md",                
                "4xl": "xl",
              }}
              position={{ "5xs": "relative" }}
              top={{ "5xs": "-2" }}
              left={{ "5xs": "3" }}
              fontWeight="normal"
            >
              District
            </Container>
            <Container
              className="footer-district-id"
              fontSize={{
                "5xs": "3xl",
                "3xs": "2xl",
                "2xs": "5xl",
                xs: "6xl",
                md: "5xl",
                lg: "2xl",
                xl: "4xl",
                "2xl": "6xl",
                "4xl": "5xl",
              }}
              fontWeight="bold"
              position={{ "5xs": "relative" }}
              top={{ "5xs": "-2" }}
              left={{ "5xs": "5" }}
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
