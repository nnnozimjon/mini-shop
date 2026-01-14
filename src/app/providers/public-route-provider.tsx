import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@entities/user";

interface PublicRouteProps {
  redirectPath?: string;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  redirectPath = "/",
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
