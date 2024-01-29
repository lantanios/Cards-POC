import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { MultipleDecksPOC } from "./POC/MultipleDecksPOC";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <MultipleDecksPOC />
  </React.StrictMode>
);
