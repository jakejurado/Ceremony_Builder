import React from "react";
import plusBtn from "../../../public/assets/plus-circle.svg";
import { addSelectorSection } from "../../functions/sections/selectorSec";
import { useTemplates } from '../../hooks/useTemplates'

  //a simple plus button to add a section
function SectionsButtonAdd(props) {
  const { setSelectorSec } = useTemplates();
  //when add button is clicked, a dispatch is sent to add the selector box to the page
  function handleClick(e) {
    const [title, index] = e.target.parentNode.classList[1].split("-");
    const insertSelector = addSelectorSection(index);
    setSelectorSec(insertSelector);
  }

  return (
    <div
      className={`addSectionButton ${props.belowSection}-${props.index} ${props.belowSection}-${props.index} addButton  `}
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
