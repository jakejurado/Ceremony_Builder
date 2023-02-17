import React, { useContext } from "react";
import { GlobalContext } from "./App";

function SideBarTemplate() {
  //brings state from App
  const { templates, setTemplateTitle } = useContext(GlobalContext);

  function handleClick(e) {
    setTemplateTitle(e.target.innerText);
  }
  return (
    <div>
      <h2>TEMPLATES</h2>
      {Object.keys(templates).map((key) => (
        <div onClick={handleClick} onKeyDown={handleClick} key={key}>
          {key}
        </div>
      ))}
    </div>
  );
}
export default SideBarTemplate;
