import React, { useState, useContext } from "react";
import { GlobalContext } from "./App";
import closeButton from "../../public/assets/plus-circle.svg";

function Popup() {
  const { popupState, popDispatch } = useContext(GlobalContext);

  function handleClick() {
    popDispatch({ type: "close" });
  }

  return (
    <div id="popup">
      <div id="popBox">
        <div id="popupContent">{popupState.display}</div>
        <div
          className="removeButton"
          onKeyDown={handleClick}
          onClick={handleClick}
        >
          <img src={closeButton} alt="close button" />
        </div>
      </div>
    </div>
  );
}

export default Popup;
