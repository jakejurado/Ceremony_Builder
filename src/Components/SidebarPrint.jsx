import React, { useContext } from "react";
import { GlobalContext } from "./App";

function SidebarPrint() {
  const { popDispatch, popupDispatch } = useContext(GlobalContext);

  function handleClick() {
    console.log("entered handleClick");
    // popDispatch({ type: "print" });
    popupDispatch({type: 'myPrint', subAct: null})
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
