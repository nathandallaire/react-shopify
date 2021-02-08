import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import App from "./main";
import "./styles/global.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("app")
);
