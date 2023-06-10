import React, { useContext } from "react";
// import Select from "react-select";
import { GlobalContext } from "./App";
import SelectorOptionMenu from "./SelectorOptionMenu";
import check from "../../public/assets/check2.svg";
import pencil from "../../public/assets/pencil_grey.svg";
import plus from "../../public/assets/plus-circle.svg";

function SideBarTemplate() {
  //brings state from App
  const { templates, setTemplates, dispatch, popupDispatch} = useContext(GlobalContext);

  function handlePlusClick(){
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
      <div className = 'h2line'>
        <img src={pencil} id='pencilIcon' className='icons' onClick={handleEditClick}/>
        <SelectorOptionMenu options={templateTitles} />
        <img src={plus} className='icons'onClick={handlePlusClick} />
      </div>
      
    </div>
  );
}
export default SideBarTemplate;
