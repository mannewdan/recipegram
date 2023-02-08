import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/main.css";
import { BrowserRouter as Router } from "react-router-dom";
import { DataContextProvider } from "./context/DataContext";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </Router>
  </React.StrictMode>
);
