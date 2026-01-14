import { useRoutes } from "react-router-dom";

import { authRoutes } from "./auth-routes";
import { userRoutes } from "./user-routes";
import { adminRoutes } from "./admin-routes";
import { NotFoundPage } from "@pages/404";

export const AppRouter = () => {
  const routes = [...authRoutes, ...userRoutes, ...adminRoutes, { path: "*", element: <NotFoundPage />}];
  const element = useRoutes(routes);
  return element;
};
