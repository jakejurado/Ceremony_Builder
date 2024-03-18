import React from "react";
import { useTemplates } from "../hooks/useTemplates";

  //sidebar section for adding user names to ceremony script.
function SidebarNames() {
  const { names, setNames } = useTemplates();

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
        <input className="person1" onChange={onNameChange} placeholder='person #1'/>
      </p>
      <p>
        <input className="person2" onChange={onNameChange} placeholder="person #2"/>
      </p>
    </div>
  );
}

export default SidebarNames;
