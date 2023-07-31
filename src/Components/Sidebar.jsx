import React, { useContext, useState } from "react";
import SideBarTemplate from "./SidebarTemplate";
import SidebarNames from "./SidebarNames.jsx";
import SidebarPrint from "./SidebarPrint";
import SidebarSave from "./SidebarSave";
import SidebarAccount from "./SidebarAccount";
import SidebarCopy from "./SidebarCopy";
import { GlobalContext } from './App';
import ButtonClose from "./ButtonClose"

  //the sidebar of the application
function Sidebar() {
  const { sidebarRef, isMobile, theSidebar } = useContext(GlobalContext)

    //hoover animations when hovering.
  function handleSidebarHover(){
    const curr = sidebarRef.current.style.width
    if(curr === '0px'){
      sidebarRef.current.style.width = '1%'
    } else if (curr === '1%'){
      sidebarRef.current.style.width = '0px'
    }
  }

  function handleMobileCloseButtonClick(){
    theSidebar.deactivate();
  }


  return (
    <div id="sideBar" className="sidebar-growth" ref={sidebarRef} onMouseOver={handleSidebarHover} onMouseLeave={handleSidebarHover} >
      <SidebarAccount />
      <SideBarTemplate />
      <SidebarNames />
      <SidebarSave />
      {!isMobile && <SidebarPrint />}
      {isMobile && <SidebarCopy />}
      {isMobile && <ButtonClose classNames='' clickFunc={handleMobileCloseButtonClick}/>}
    </div>
  );
}

export default Sidebar;
