import React, { useContext, useEffect } from "react";
import SideBarTemplate from "./SidebarTemplate";
import SidebarNames from "./SidebarNames.jsx";
import SidebarPrint from "./SidebarPrint";
import SidebarSave from "./SidebarSave";
import SidebarAccount from "./SidebarAccount";
import { GlobalContext } from './App';
import ButtonClose from "./ButtonClose"

  //the sidebar of the application
function Sidebar() {
  const { sidebarRef, isMobile, theSidebar } = useContext(GlobalContext)

    //hoover animations when hovering.
  function handleSidebarHover(){
    console.log(sidebarRef.current)
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
      <ButtonClose classNames='onlyShowOnMobile' clickFunc={handleMobileCloseButtonClick}/>
    </div>
  );
}

export default Sidebar;
