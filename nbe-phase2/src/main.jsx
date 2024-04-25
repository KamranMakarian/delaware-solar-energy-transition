import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  breakpoints: {
    "5xs": "30em", // 480px
    "4xs": "33.75em", // 540px
    "3xs": "45em", // 720px
    "2xs": "48em", // 768px
    xs: "51.25em", // 820px
    sm: "57em", // 912px
    md: "62em", // 992px
    lg: "64em", // 1024px
    xl: "80em", // 1280px
    "2xl": "85.375em" , // 1366px
    "3xl": "96em", // 1536px
    "4xl": "120em", // 1920px   
  },
  styles: {
    global: {
      "::-webkit-scrollbar": {
        width: "12px", // width of the scrollbar
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "#f1f1f1", // color of the scrollbar track
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "#888", // color of the scrollbar thumb
        borderRadius: "6px", // rounded corners for the thumb
      },
    },
  },
});


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
