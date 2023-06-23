import React, { useContext } from "react";
import { GlobalContext } from "./App";
import hamburger from "../../public/assets/menu_open_FILL0_wght400_GRAD0_opsz48.svg";

  //button to activate sidebar
function SidebarButton() {
  const {theSidebar} = useContext(GlobalContext);

  function handleClick() {
    theSidebar.toggle();
  }

  return (
    <div id="sidebarButton" className="buttonLg" onClick={handleClick}>
      <img id="ham" src={hamburger} alt="symbole for menu" />
    </div>
  );
}

export default SidebarButton;
