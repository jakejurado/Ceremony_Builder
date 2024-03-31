import React, { useEffect, useState } from "react";
// import Select from "react-select";
import SidebarTemplateMenu from "./SidebarTemplateMenu";
import pencil from "../../../public/assets/pencil_grey.svg";
import plus from "../../../public/assets/plus-circle.svg";
import { determineTemplateTitle } from "../../functions/template/determineTemplateTitle";
import { useScreen } from "../../hooks/useScreen";
import { useTemplates } from "../../hooks/useTemplates";
import { useSidebar } from "../../hooks/useSidebar";
import { usePopup } from "../../hooks/usePopup";

  //chooses which template to display
function SideBarTemplate() {
  const { isMobile } = useScreen();
  const { templates, setTemplateTitle, dispatch, setMetaData, metaData} = useTemplates();
  const { popupDispatch } = usePopup();
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
    
    //update templates state
    const key = determineTemplateTitle(templates)
    dispatch({type: 'addTEMPLATE', payload: {newTitle: key}})

    //update the curent template title
    setTemplateTitle(key);
    
    //update metaData
    const metaDataCopy = new Map(metaData);
    metaDataCopy.set(key, {number: null, title: key})
    setMetaData(metaDataCopy);
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
