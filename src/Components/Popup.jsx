import React, { useState, useContext } from "react";
import AccountBox from "./AccountBox";
import { GlobalContext } from "./App";
import PopupPrint from "./PopupPrint";
import closeButton from "../../public/assets/plus-circle.svg";

function Popup() {
  const { popupState, popDispatch } = useContext(GlobalContext);

  function handleClick() {
    popDispatch({ type: "close" });
  }

  return (
    <div id="popup">
      <div id="popBox">
        <div id="popupContent">
          {popupState.display === "account" && <AccountBox />}

          {popupState.display === "print" && <PopupPrint />}
        </div>
        <div className="removeButton" onClick={handleClick}>
          <img src={closeButton} alt="close button" />
        </div>
      </div>
    </div>
  );
}

export default Popup;
