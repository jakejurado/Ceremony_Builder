import React, { useContext } from "react";
import SideBarTemplate from "./SidebarTemplate";
import SidebarNames from "./SidebarNames.jsx";

function Sidebar({ templates, templateTitle, selectTemplate }) {
  return (
    <div id="sideBar">
      <div id="login">sign in | sign up</div>
      <SideBarTemplate />
      <SidebarNames />
      {/* <div>Names</div> */}
      {/* <div>Your Templates</div> */}
      <div>Save Current</div>
    </div>
  );
}

export default Sidebar;
