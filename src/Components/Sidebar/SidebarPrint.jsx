import React, { useContext } from "react";
import { usePopup } from "../../hooks/usePopup";

  //sidebar print section.
function SidebarPrint() {
  const { popupDispatch } = usePopup();

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
