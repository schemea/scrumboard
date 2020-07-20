import ReactDOM from "react-dom";
import React from "react";
import { Home } from "./home/components/home";


const root = document.body.appendChild(document.createElement("div"));

ReactDOM.render(React.createElement(Home), root);
