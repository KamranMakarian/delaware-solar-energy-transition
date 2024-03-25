import { Card, CardHeader, CardBody, Heading } from "@chakra-ui/react";

function DistrictCard(props) {
  let backgroundColor;

  switch (props.party) {
    case "R":
      backgroundColor = "#1c3558";
      break;
    case "D":
      backgroundColor = "#263e44";
      break;
    case "I":
      backgroundColor = "#727845";
      break;
    default:
      backgroundColor = "#F5F5F5";
      break;
  }

  return (
    
    <Card backgroundColor={backgroundColor} size="md"        
        borderRadius="lg"
        overflow="hidden"
        mt="3"
        mb="3"
        ml="6"
        mr="6"
        boxShadow="lg"
        color="white"
        _hover={{
            transform: "scale(1.5)",
            transition: "transform 0.5s ease-in-out",            
            boxShadow: "2xl",
            cursor: "pointer",             
        }
    }
    >
      <CardHeader>
        <Heading as="h3" size="xl">
          {/* {props.memberName} */}
          District {props.id}
        </Heading>
      </CardHeader>
      <CardBody>
        {/* <Image src={props.imagePath} alt={`District ${props.id}`} /> */}
        {/* <h1>District {props.id}</h1> */}
      </CardBody>
    </Card>
    
    
  );
}

export default DistrictCard;
