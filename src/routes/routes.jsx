import HomePage from "../pages/HomePage";
import HelpPage from "../pages/HelpPage";
import ConfessionsPage from "../pages/ConfessionsPage";

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
];

export default routes;
