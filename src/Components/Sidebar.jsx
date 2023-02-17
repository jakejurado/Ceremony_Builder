import React, { useContext } from "react";
import SideBarTemplate from "./SidebarTemplate";
import "../styles/sidebar.css";

function Sidebar({ templates, templateTitle, selectTemplate }) {
  return (
    <div id="sideBar">
      <div id="login">LogIn</div>
      <SideBarTemplate />
      <div>Names</div>
      <div>Your Templates</div>
      <div>Save Current</div>
    </div>
  );
}

export default Sidebar;
