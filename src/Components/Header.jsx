import React from "react";
import cbImage from "../../public/assets/ceremonybuilder.png";

function Header() {
  return (
    <div className="titleS">
      <h1>
        <img id="h1Image" src={cbImage} alt="image of words Ceremony Builder" />
      </h1>
    </div>
  );
}

export default Header;
