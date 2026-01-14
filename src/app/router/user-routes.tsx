import { UserLayout } from "@app/layouts";
import type { RouteObject } from "react-router-dom";

import { CartPage } from "@pages/cart";
import { OrdersPage } from "@pages/orders";
import { MainPage } from "@pages/main";
import { CatalogPage } from "@pages/catalog";
import { CheckoutPage } from "@pages/checkout";
import { ProductPage } from "@pages/product";


export const userRoutes: RouteObject[] = [
  {
    element: <UserLayout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/catalog", element: <CatalogPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckoutPage />},
      { path: "/orders", element: <OrdersPage /> },
      { path: "/product/:productId", element: <ProductPage /> },
    ],
  },
];
