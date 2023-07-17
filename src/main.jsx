import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ConfessionsPage from "./pages/ConfessionsPage";
import { VentifyContextProvider } from "./context/VentifyContextProvider";
import HelpPage from "./pages/HelpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/confessions",
    element: <ConfessionsPage />,
  },
  {
    path: "/help",
    element: <HelpPage />,
  },
]);

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <VentifyContextProvider>
        <RouterProvider router={router} />
      </VentifyContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
