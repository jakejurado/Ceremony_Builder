import React from "react";
import "./App.css";
import MainDisplay from "./Components/MainDisplayHook";
import cbImage from "../public/assets/ceremonybuilder.png";

function App() {
  return (
    <div className="App">
      <MainDisplay />
    </div>
  );
}

function TemplateBtn() {
  return (
    <div className="template">
      Template:
      <button>Wedding</button>
      <button>Elopement</button>
      Saved:
      <button>Ceremony1</button>
      <button>Ceremony2</button>
    </div>
  );
}

export default App;
