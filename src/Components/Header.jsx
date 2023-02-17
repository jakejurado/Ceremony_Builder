import React from "react";
import "../styles/header.css";
import cbImage from "../../public/assets/ceremonybuilder.png";

function Header() {
  return (
    <div className="titleS">
      <img id="h1Image" src={cbImage} alt="image of words Ceremony Builder" />
    </div>
  );
}

export default Header;
