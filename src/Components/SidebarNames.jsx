import React, { useContext } from "react";
import { GlobalContext } from "./App";

function SidebarNames() {
  const { names, setNames } = useContext(GlobalContext);

  function onNameChange(e) {
    const name = e.target.value.toUpperCase();
    const placeholder = e.target.classList[0];
    setNames({ ...names, [placeholder]: name });
    return name, placeholder;
  }

  return (
    <div className="sidebarNames sidebarElements">
      <h2>NAMES</h2>
      <p>
        person #1:
        <input className="person1" onChange={onNameChange} />
      </p>
      <p>
        person #2:
        <input className="person2" onChange={onNameChange} />
      </p>
    </div>
  );
}

export default SidebarNames;
