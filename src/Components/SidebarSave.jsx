import React, { useContext } from "react";
import { GlobalContext } from "./App";

function SidebarSave() {
  const { dispatch } = useContext(GlobalContext);

  function handleClick() {
    dispatch({type: 'saveTemplateToDatabase', payload: null} )
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
