import React from "react";
import "./App.css";
import MainDisplay from "./Components/MainDisplayHook";
// import MainDisplay from "./Components/MainDisplay";
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
      <button type="button">Wedding</button>
      <button type="button">Elopement</button>
      Saved:
      <button type="button">Ceremony1</button>
      <button type="button">Ceremony2</button>
    </div>
  );
}

export default App;
