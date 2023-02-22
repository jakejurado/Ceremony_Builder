import React, { useContext } from "react";
import SideBarTemplate from "./SidebarTemplate";

function Sidebar({ templates, templateTitle, selectTemplate }) {
  return (
    <div id="sideBar">
      <div id="login">sign in | sign up</div>
      <SideBarTemplate />
      {/* <div>Names</div> */}
      {/* <div>Your Templates</div> */}
      <div>Save Current</div>
    </div>
  );
}

export default Sidebar;
