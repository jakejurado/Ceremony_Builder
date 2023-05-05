import React, { useContext } from "react";
import { GlobalContext } from "./App";

function SidebarSave() {
  const { popDispatch } = useContext(GlobalContext);

  function handleClick() {
    console.log("entered handleClick");
    popDispatch({ type: "save" });
  }

  return (
    <div className="sidebarElements">
      <h2>Save</h2>
      <button className="boxButton" onClick={handleClick}>
        Save
      </button>
    </div>
  );
}

export default SidebarSave;
