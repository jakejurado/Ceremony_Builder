import React, { useContext } from "react";
// import Select from "react-select";
import { GlobalContext } from "./App";
import SidebarTemplateMenu from "./SidebarTemplateMenu";
import pencil from "../../public/assets/pencil_grey.svg";
import plus from "../../public/assets/plus-circle.svg";

  //chooses which template to display
function SideBarTemplate() {
  const { templates, dispatch, popupDispatch, theSidebar, isMobile} = useContext(GlobalContext);

  function handlePlusClick(){
    if(isMobile) theSidebar.deactivate();
    dispatch({ type: "addTEMPLATE", payload: {key: 'myTemplate', value: {order:[]}}});
  }

  function handleEditClick(){
    popupDispatch({type: 'myTemplates', subAct: null})
  }

  const templateTitles = [];
  Object.keys(templates).forEach((template, i) => {
    templateTitles.push({ label: template, value: template });
  });

  return (
    <div className="sidebarTemplate sidebarElements">
      <h2>TEMPLATES</h2>
      <div className = 'templateSelectorDiv'>
        <img src={pencil} id='pencilIcon' className='icons' onClick={handleEditClick}/>
        <SidebarTemplateMenu options={templateTitles} />
        <img src={plus} className='icons'onClick={handlePlusClick} />
      </div>
      
    </div>
  );
}
export default SideBarTemplate;
