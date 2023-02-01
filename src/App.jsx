import React, { useState, useEffect } from "react";
import "./App.css";
import MainDisplay from "./Components/MainDisplay";
import Sidebar from "./Components/Sidebar";
import SidebarButton from "./Components/SidebarButton";
import { openCloseSidebar } from "./helper/sidebarFuncs";
import cbImage from "../public/assets/ceremonybuilder.png";

function App() {
  //keeps track of sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    openCloseSidebar(sidebarOpen);
  }, [sidebarOpen]);

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <div className="App">
      <SidebarButton toggleSidebar={toggleSidebar} />
      <Sidebar />
      <MainDisplay />
    </div>
  );
}

export default App;
