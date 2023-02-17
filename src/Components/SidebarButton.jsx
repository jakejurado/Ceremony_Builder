import React, { useEffect } from "react";
import "../styles/sidebarButton.css";
import hamburger from "../../public/assets/menu_open_FILL0_wght400_GRAD0_opsz48.svg";

function SidebarButton({ toggleSidebarState }) {
  function handleClick() {
    toggleSidebarState();
  }
  useEffect(() => {
    document
      .getElementById("sidebarButton")
      .addEventListener("click", handleClick, { once: true });
  });

  return (
    <div id="sidebarButton">
      <img id="ham" src={hamburger} alt="symbole for menu" />
    </div>
  );
}

export default SidebarButton;
