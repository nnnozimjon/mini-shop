import { AuthLayout } from "@app/layouts";
import type { RouteObject } from "react-router-dom";
import { LoginPage, RegisterPage } from "@pages/auth";
import { PublicRoute } from "@app/providers";


export const authRoutes: RouteObject[] = [
  {
    element: <PublicRoute />,
    children:[
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
        ],
      }
    ]
  },
];
