import "./index.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme>
      <App />
      <Toaster position="top-right" reverseOrder={false} /> 
    </Theme>
  </React.StrictMode>
);
