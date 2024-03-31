import React, { useContext, useRef, useState } from "react";
import { GlobalContext } from "../App";
import { enterNames } from "../../functions/sections/names";
import { sanatize } from "../../functions/wordCards/sanatize";
import { formatCards } from "../../functions/wordCards/formatCards";
// import { useSwipeable, onSwipedRight, onSwipedLeft } from 'react-swipeable';
// import ButtonClose from "./ButtonClose"

  //Displays main content/scripts of each section
function Words({cardContent}) {


    //creates a dom element
  const card = React.createElement("div", {
    className: `cards ${className}`,
    contentEditable: "true",
    onClick: expandCardMobile,
    dangerouslySetInnerHTML: { __html: cardContent },
    ref: cardDivRef,
    'data-varname': `${className}`,
    'data-cardindex': `${cardIndex}`,
    onBlur: saveContent,
  });

  return card;
}

export default Words
