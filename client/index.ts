import ReactDOM from "react-dom";
import React from "react";
import "./styles.scss";
import { MainComponent } from "./components/main";

const root = document.body.appendChild(document.createElement("div"));
root.id    = "root";

ReactDOM.render(React.createElement(MainComponent), root);
