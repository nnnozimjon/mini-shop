import { AdminOrdersPage, AdminProductsPage } from "@pages/admin";
import { AdminLayout } from "@app/layouts";
import type { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@app/providers";

export const adminRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "/admin/products", element: <AdminProductsPage /> },
          { path: "/admin/orders", element: <AdminOrdersPage /> },
        ],
      },
    ],
  },
];
