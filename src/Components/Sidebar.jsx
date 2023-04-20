import React, { useContext } from "react";
import SideBarTemplate from "./SidebarTemplate";
import SidebarNames from "./SidebarNames.jsx";
import SidebarPrint from "./SidebarPrint";
import { GlobalContext } from "./App";

function Sidebar() {
  const {setPopup, domSidebar, domCover} = useContext(GlobalContext);

  function handleLoginClick(){
    setPopup('login')
  }

  function handleSigninClick(){
    setPopup('signup')
  }

  return (
    <div id="panel">
      <div id="cover" ref={domCover}/>
      <div id="sideBar" ref={domSidebar}>
        <div id="login"><span onClick={handleLoginClick}>login</span> | <span onClick={handleSigninClick}>signup</span></div>
        <SideBarTemplate />
        <SidebarNames />
        <SidebarPrint />
      </div>
      {/* <div>Save Current</div> */}
    </div>
  );
}

export default Sidebar;
