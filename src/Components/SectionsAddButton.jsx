import React, { useContext } from "react";
import plusBtn from "../../public/assets/plus-circle.svg";

function SectionsAddButton(props) {
  //when add button is clicked, a dispatch is sent to add the selector box to the page
  function handleClick(e) {
    const [title, index] = e.target.parentNode.classList[1].split("-");
    props.dispatch({ type: "selectSEC", payload: { title, index } });
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

export default SectionsAddButton;
