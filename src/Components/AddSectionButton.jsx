import React from "react";
import addButton from "../../public/assets/plus-circle.svg";
import "../styles/addSectionButton.scss";

function AddSectionButton(props) {
  function handleClick(e) {
    const [title, index] = e.target.parentNode.classList[1].split("-");
    const newObj = { title, index, action: "selectSEC" };
    // props.handleSectionChange(newObj);
    props.dispatch({ type: "selectSEC", payload: { title, index } });
  }

  return (
    <div className={`addSectionButton ${props.belowSection}-${props.index}`}>
      <div className={`circle ${props.belowSection}-${props.index}`}>
        <img
          className="addButtonImg"
          src={addButton}
          alt="add section button"
          onClick={handleClick}
          onKeyDown={handleClick}
        />
      </div>
    </div>
  );
}

export default AddSectionButton;
