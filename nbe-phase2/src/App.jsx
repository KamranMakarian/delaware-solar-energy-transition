
import "./App.css";
import {ChakraProvider} from "@chakra-ui/react";
import Home from "./pages/Home";
import { predict } from "./api/predict";

predict(3);

function App() {
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  );
}

export default App;
