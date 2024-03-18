import React from "react";
import { createRoot } from "react-dom/client";
import App from "./Components/App";
import _App from "./Components/_App";


const container = document.getElementById("root");
const root = createRoot(container);

root.render(<_App tab="home" />);
