import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  breakpoints: {
    "9xs": "20em", // 320px
    "8xs": "22.5em", // 360px
    "7xs": "23.438em", // 375px
    "6xs": "30em", // 480px
    "5xs": "33.75em", // 540px
    "4xs": "41.688", // 667px
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
        width: "0.75em", // width of the scrollbar
        height: "0.75em", // height of the scrollbar
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "#f1f1f1", // color of the scrollbar track
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "#19416C", // color of the scrollbar thumb
        borderRadius: "0.375em", // rounded corners for the thumb
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
