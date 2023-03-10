import React, { useContext } from "react";
import { GlobalContext } from "./App";

function SidebarPrint() {
  const { popDispatch } = useContext(GlobalContext);

  function handleClick() {
    console.log("entered handleClick");
    popDispatch({ type: "print" });
  }

  return (
    <div className="sidebarElements">
      <h2>PRINT</h2>
      <button className="boxButton" onClick={handleClick}>
        Print
      </button>
    </div>
  );
}

export default SidebarPrint;
