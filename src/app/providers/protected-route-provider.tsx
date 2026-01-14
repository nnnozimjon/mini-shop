import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUserRole,
} from "@entities/user";
import type { UserRole } from "@entities/user";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  redirectPath?: string;
  roleMismatchRedirect?: string;
}

export const ProtectedRoute = ({
  allowedRoles = ["USER"],
  redirectPath = "/login",
  roleMismatchRedirect = "/",
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectUserRole);

  if (!isAuthenticated) return <Navigate to={redirectPath} replace />;

  if (!allowedRoles.includes(role!))
    return <Navigate to={roleMismatchRedirect} replace />;

  return <Outlet />;
};
