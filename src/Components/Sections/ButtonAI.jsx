import React from "react";
import aiBtn from "../../../public/assets/robot_2_.svg";

  //a robot button to interface with AI
function ButtonAI({handleClick}) {

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

export default ButtonAI;
