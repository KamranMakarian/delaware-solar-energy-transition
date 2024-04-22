import "./App.css";
import { extendTheme, ChakraProvider, Card } from "@chakra-ui/react";
import Home from "./pages/Home";

const customTheme = extendTheme({
  zIndices: {    
    Card: "1",
    Button: "1",
    CardFooter: "1",
  },
});



function App() {


  return (
    <ChakraProvider theme={customTheme}>
      <Home />
    </ChakraProvider>
  );
}

export default App;
  
