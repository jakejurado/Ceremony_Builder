import React, { useContext } from "react";
import SideBarTemplate from "./SidebarTemplate";
import SidebarNames from "./SidebarNames.jsx";
import SidebarPrint from "./SidebarPrint";

function Sidebar() {
  return (
    <div id="panel">
      <div id="cover" />
      <div id="sideBar">
        <div id="login">sign in | sign up</div>
        <SideBarTemplate />
        <SidebarNames />
        <SidebarPrint />
      </div>
      {/* <div>Save Current</div> */}
    </div>
  );
}

export default Sidebar;
