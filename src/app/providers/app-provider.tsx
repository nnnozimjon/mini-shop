import { StoreProvider } from "./store-provider";
import { RouterProvider } from "./router-provider";
import { FiltersProvider } from "@features/product";

type Props = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <StoreProvider>
      <FiltersProvider>
        <RouterProvider>{children}</RouterProvider>
      </FiltersProvider>
    </StoreProvider>
  );
};
