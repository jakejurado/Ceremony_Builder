import React from "react";
import aiBtn from "../../../public/assets/robot_2_.svg";
import { usePopup } from "../../hooks/usePopup";

  //a simple plus button to add a section
function SectionsButtonAI({index, varName, cardIndex, cardContent, props}) {
  const { popupDispatch } = usePopup();

  //when add button is clicked, a dispatch is sent to add the selector box to the page
  function handleClick(e) {
    const dataVarname = e.target.parentNode.dataset.varname;
    const dataIndex = e.target.parentNode.dataset.index;
    const dataCardIndex = e.target.parentNode.dataset.cardindex;
    const dataCardContent = e.target.parentNode.dataset.cardcontent;
    popupDispatch({ type: "boxAI", subAct: { dataVarname, dataIndex, dataCardContent, dataCardIndex } });
  }

  return (
    <div
      data-index={index}
      data-varname={varName}
      data-cardindex={cardIndex}
      data-cardcontent={cardContent}
      className={`aiSectionButton aiButton`}
    >
      <img
        src={aiBtn}
        alt="ai section button"
        onClick={handleClick}
        onKeyDown={handleClick}
      />
    </div>
  );
}

export default SectionsButtonAI;
