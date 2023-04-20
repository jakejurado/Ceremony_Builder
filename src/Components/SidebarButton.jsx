import React, { useEffect } from "react";
// import "../styles/sidebarButton.scss";
import hamburger from "../../public/assets/menu_open_FILL0_wght400_GRAD0_opsz48.svg";

function SidebarButton({ toggleSidebarState, domSidebarButton, theSidebar }) {
  function handleClick() {
    console.log({theSidebar})
    theSidebar.toggle();
  }

  // useEffect(() => {
  //   document
  //     .getElementById("sidebarButton")
  //     .addEventListener("click", handleClick, { once: true });
  // });

  return (
    <div id="sidebarButton" className="buttonLg" ref={domSidebarButton} onClick={handleClick}>
      <img id="ham" src={hamburger} alt="symbole for menu" />
    </div>
  );
}

export default SidebarButton;
