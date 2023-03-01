import React, { useState, useContext } from "react";
import AccountBox from "./AccountBox";
import { GlobalContext } from "./App";
import PopupPrint from "./PopupPrint";
import closeButton from "../../public/assets/plus-circle.svg";

function Popup() {
  const { setIsPopup } = useContext(GlobalContext);
  const [isAccountBox, setIsAccountBox] = useState(false);
  const [isPrint, setIsPrint] = useState(true);

  function handleClick() {
    setIsPopup(false);
  }

  return (
    <div id="popup">
      <div id="popBox">
        <div id="closePopup" className="removeButton" onClick={handleClick}>
          <img src={closeButton} alt="close button" />
        </div>
        <div id="popupContent">
          {isAccountBox && <AccountBox />}

          {isPrint && <PopupPrint />}
        </div>
        <div className="removeButton" onClick={handleClick}>
          <img src={closeButton} alt="close button" />
        </div>
      </div>
    </div>
  );
}

export default Popup;
