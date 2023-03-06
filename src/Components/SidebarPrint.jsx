import React, { useContext } from "react";
import { GlobalContext } from "./App";

function SidebarPrint() {
  const { popDispatch } = useContext(GlobalContext);

  function handleClick() {
    popDispatch({ type: "print" });
  }

  return (
    <div className="sidebarElements">
      <h2>Print</h2>
      <button className="print" onClick={handleClick}>
        Print
      </button>
    </div>
  );
}

export default SidebarPrint;
