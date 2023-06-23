import React, { useContext } from "react";
import { GlobalContext } from "./App";

  //sidebar print section.
function SidebarPrint() {
  const { popupDispatch } = useContext(GlobalContext);

  function handleClick() {
    popupDispatch({type: 'myPrint', subAct: null})
  }

  return (
    <div className="sidebarElements">
      <button className="boxButton" onClick={handleClick}>
        Print
      </button>
    </div>
  );
}

export default SidebarPrint;
