import React, { useState, useEffect } from "react";
import "../styles/App.css"
import MainDisplay from "./MainDisplay";
import Sidebar from "./Sidebar";
import SidebarButton from "./SidebarButton";
import { openCloseSidebar } from "../functions/mainPage/sidebarFuncs";
// import cbImage from "../public/assets/ceremonybuilder.png";

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
