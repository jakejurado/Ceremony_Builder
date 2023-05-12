import React, { useContext } from "react";
import { GlobalContext } from "./App";

function SidebarSave() {
  const { dispatch, template, domRef } = useContext(GlobalContext);

  function handleClick() {
    const domSections = document.getElementById('mainDisplay');
    console.log({domRef})
    dispatch({type: 'saveTemplate', payload: { template, domRef }} )
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
