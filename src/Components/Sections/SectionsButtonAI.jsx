import React from "react";
import aiBtn from "../../../public/assets/robot_2_.svg";
import { usePopup } from "../../hooks/usePopup";

  //a robot button to interface with AI
function SectionsButtonAI({handleClick}) {

  return (
    <div
      className='aiSectionButton aiButton'
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
