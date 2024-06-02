import React from "react";
import plusBtn from "../../../public/assets/plus-circle.svg";

  //a simple plus button to add a section
function SectionsButtonAdd({handleClick}) {
  

  return (
    <div
      className='addSectionButton addButton'
    >
      <img
        src={plusBtn}
        alt="add section button"
        onClick={handleClick}
        onKeyDown={handleClick}
      />
    </div>
  );
}

export default SectionsButtonAdd;
