import "./StateViz.css";
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Card,
  Flex,
  Center,
} from "@chakra-ui/react";

import { ArrowRightIcon } from "@chakra-ui/icons";

function StateViz() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Flex className="state-viz-container" flexDirection="column">
        <Card size="md"
        
        >STATE VIZ</Card>
        <Center
        h="100vh"
        >
        <ArrowRightIcon
          ref={btnRef}
          colorScheme="teal"
          onClick={onOpen}

        >
          Open
        </ArrowRightIcon>
        </Center>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"full"}
        isFullHeight={true}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>This is the header</DrawerHeader>
          <DrawerBody>This is the body</DrawerBody>

          <DrawerFooter>This is the footer</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default StateViz;
