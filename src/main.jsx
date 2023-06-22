import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CardPage from "./pages/AboutUs.jsx";
import ConfessionsPage from "./pages/ConfessionsPage";
import ContactUsPage from "./pages/ContactUs";

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
    path: "/aboutus",
    element: <CardPage />,
  },
  {
    path: "/contactus",
    element: <ContactUsPage />,
  },
]);

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
