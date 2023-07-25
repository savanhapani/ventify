import HomePage from "../pages/HomePage";
import HelpPage from "../pages/HelpPage";
import ConfessionsPage from "../pages/ConfessionsPage";
import ErrorPage from "../pages/ErrorPage";

const routes = [
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
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default routes;
