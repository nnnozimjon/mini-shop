import React from "react";
import ReactDOM from "react-dom/client";

import { AppProvider, initAuth } from "./providers";
import "./styles/index.css";
import { AppRouter } from "./router";
import { ToastContainer } from 'react-toastify'

initAuth()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <AppRouter />
      <ToastContainer position="bottom-right" />
    </AppProvider>
  </React.StrictMode>
);
