import React, { useContext } from "react";
import SideBarTemplate from "./SidebarTemplate";
import SidebarNames from "./SidebarNames.jsx";
import SidebarPrint from "./SidebarPrint";
import SidebarSave from "./SidebarSave";
import SidebarAccount from "./SidebarAccount";
import { GlobalContext } from './App';

  //the sidebar of the application
function Sidebar() {
  const { sidebarRef, isMobile } = useContext(GlobalContext)

    //hoover animations when hovering.
  function handleSidebarHover(){
    const curr = sidebarRef.current.style.width
    if(curr === '0px'){
      sidebarRef.current.style.width = '1%'
    } else if (curr === '1%'){
      sidebarRef.current.style.width = '0px'
    }
  }

  return (
    <div id="sideBar" className="sidebar-growth" ref={sidebarRef} onMouseOver={handleSidebarHover} onMouseLeave={handleSidebarHover}>
      <SidebarAccount />
      <SideBarTemplate />
      <SidebarNames />
      <SidebarSave />
      {!isMobile && <SidebarPrint />}
    </div>
  );
}

export default Sidebar;
