import React, { useRef, useContext } from "react";
import SideBarTemplate from "./SidebarTemplate";
import SidebarNames from "./SidebarNames.jsx";
import SidebarPrint from "./SidebarPrint";
import SidebarSave from "./SidebarSave";
import SidebarAccount from "./SidebarAccount";
import { GlobalContext } from './App';

function Sidebar() {
  const domSidebar = useRef(null);

  function handleSidebarHover(){
    const curr = domSidebar.current.style.width
    if(curr === '0px'){
      domSidebar.current.style.width = '1%'
    } else if (curr === '1%'){
      domSidebar.current.style.width = '0px'
    }
  }

  return (
    <div id="panel">
      <div id="cover" />
      <div id="sideBar" ref={domSidebar} onMouseOver={handleSidebarHover} onMouseLeave={handleSidebarHover}>
        {/* <div id="login"><span onClick={handleLoginClick}>login</span> | <span onClick={handleSigninClick}>signup</span></div> */}
        <SidebarAccount />
        <SideBarTemplate />
        <SidebarNames />
        <SidebarSave />
        <SidebarPrint />
      </div>
      {/* <div>Save Current</div> */}
    </div>
  );
}

export default Sidebar;
