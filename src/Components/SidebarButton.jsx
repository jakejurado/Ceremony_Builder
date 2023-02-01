import React from "react";
import "../styles/sidebarButton.css";

function SidebarButton({ toggleSidebar }) {
  function handleClick() {
    toggleSidebar();
  }

  return (
    <div id="sidebarButton" onClick={handleClick} onKeyDown={handleClick}>
      =
    </div>
  );
}

export default SidebarButton;
