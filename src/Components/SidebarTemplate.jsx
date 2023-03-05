import React, { useContext } from "react";
// import Select from "react-select";
import { GlobalContext } from "./App";
import SelectorOptionMenu from "./SelectorOptionMenu";

function SideBarTemplate() {
  //brings state from App
  const { templates, setTemplateTitle } = useContext(GlobalContext);

  function handleClick(e) {
    setTemplateTitle(e.target.innerText);
  }

  const templateTitles = [];
  Object.keys(templates).forEach((template, i) => {
    templateTitles.push({ label: template, value: template });
  });

  return (
    <div className="sidebarTemplate sidebarElements">
      <h2>TEMPLATES</h2>
      <SelectorOptionMenu options={templateTitles} />
    </div>
  );
  // https://www.w3schools.com/howto/howto_custom_select.asp
}
export default SideBarTemplate;
