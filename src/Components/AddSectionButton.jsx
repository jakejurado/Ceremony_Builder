import React from "react";
import addButton from "../../public/assets/add.png";

function AddSectionButton(props) {
  function handleClick(e) {
    const [title, index] = e.target.parentNode.classList[1].split("-");
    const newObj = { title, index, action: "selectSEC" };
    // props.handleSectionChange(newObj);
    props.dispatch({ type: "selectSEC", payload: { title, index } });
  }

  return (
    <li className={`addSectionButton ${props.belowSection}-${props.index}`}>
      <img
        id="addButtonImg"
        src={addButton}
        alt="add section button"
        onClick={handleClick}
        onKeyDown={handleClick}
      />
    </li>
  );
}

export default AddSectionButton;
