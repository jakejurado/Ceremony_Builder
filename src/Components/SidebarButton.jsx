import React, { useEffect } from "react";
import "../styles/sidebarButton.css";

function SidebarButton({ toggleSidebarState }) {
  function handleClick() {
    toggleSidebarState();
  }
  useEffect(() => {
    document
      .getElementById("sidebarButton")
      .addEventListener("click", handleClick, { once: true });
  });

  return <div id="sidebarButton">=</div>;
}

export default SidebarButton;
