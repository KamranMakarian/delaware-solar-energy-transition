import Header from "./components/Header/Header";
import "./App.css";
import {ChakraProvider} from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Header />
    </ChakraProvider>
  );
}

export default App;
