import React, { useEffect, useState } from "react";
// import Select from "react-select";
import SidebarTemplateMenu from "./SidebarTemplateMenu";
import pencil from "../../public/assets/pencil_grey.svg";
import plus from "../../public/assets/plus-circle.svg";
import { useScreen } from "../hooks/useScreen";
import { useTemplates } from "../hooks/useTemplates";
import { useSidebar } from "../hooks/useSidebar";

  //chooses which template to display
function SideBarTemplate() {
  const { isMobile } = useScreen();
  const { templates, dispatch, popupDispatch} = useTemplates();
  const { closeSidebar} = useSidebar();
  const [templateTitles, setTemplateTitles] = useState([]);

  
  useEffect(() => {
    const allTitles = []
    Object.keys(templates).forEach((template, i) => {
      allTitles.push({ label: template, value: template });
    });
    setTemplateTitles(allTitles);
  }, [templates])

  function handlePlusClick(){
    if(isMobile) closeSidebar();
    dispatch({ type: "addTEMPLATE", payload: {key: 'myTemplate', value: {order:[]}}});
  }

  function handleEditClick(){
    popupDispatch({type: 'myTemplates', subAct: null})
  }


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
