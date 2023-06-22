import React, { useContext } from "react";
import { GlobalContext } from "./App";

function SidebarPrint() {
  const { popupDispatch, dispatch } = useContext(GlobalContext);

  function handleClick() {
    // dispatch({type: 'saveTEMPLATE'})
    popupDispatch({type: 'myPrint', subAct: null})
  }

  return (
    <div className="sidebarElements">
      {/* <h2>PRINT</h2> */}
      <button className="boxButton" onClick={handleClick}>
        Print
      </button>
    </div>
  );
}

export default SidebarPrint;
