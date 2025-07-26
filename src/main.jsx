import "./index.css";

import App from "./App.jsx";
import { HelmetProvider } from 'react-helmet-async';
import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme>
      <HelmetProvider>
      <App />
      </HelmetProvider>
      <Toaster position="top-right" reverseOrder={false} /> 
    </Theme>
  </React.StrictMode>
);
