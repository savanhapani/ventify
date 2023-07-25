import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { VentifyContextProvider } from "./context/VentifyContextProvider";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <VentifyContextProvider>
        <App />
      </VentifyContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
