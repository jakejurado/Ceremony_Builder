import React, { useContext } from "react";
// import Select from "react-select";
import { GlobalContext } from "./App";
import SelectorOptionMenu from "./SelectorOptionMenu";

function SideBarTemplate() {
  //brings state from App
  const { templates } = useContext(GlobalContext);

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
}
export default SideBarTemplate;
