import "./index.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme>
      <App />
    </Theme>
  </React.StrictMode>
);
