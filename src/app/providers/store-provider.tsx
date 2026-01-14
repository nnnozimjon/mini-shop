import { Provider } from "react-redux";
import { store } from "@app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@app/store";

type Props = {
  children: React.ReactNode;
};

export const StoreProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
