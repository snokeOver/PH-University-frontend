import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";

import { adminRoutes } from "./admin.routes";
import { routeGenerator } from "../utils/routesGenerator";
import { facultyRoutes } from "./faculty.routes";
import { studentRoutes } from "./student.routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/admin",
    element: <App />,
    children: routeGenerator(adminRoutes),
  },
  {
    path: "/student",
    element: <App />,
    children: routeGenerator(studentRoutes),
  },
  {
    path: "/faculty",
    element: <App />,
    children: routeGenerator(facultyRoutes),
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);
