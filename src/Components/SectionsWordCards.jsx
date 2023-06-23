import React, { useContext, useRef } from "react";
import { GlobalContext } from "./App";
import { enterNames } from "../functions/sections/names";
import { sanatize } from "../functions/wordCards/sanatize";
import { formatCards } from "../functions/wordCards/formatCards";

  //Displays main content/scripts of each section
function WordCards(props) {
  const { names, dispatch } = useContext(GlobalContext);
  const divRef = useRef(null);

    //saves user input and formats it for the database.
  function saveContent(){
      //removes names and adds line breaks
    const textContent = formatCards(divRef.current.innerHTML, names);
    const sectionName = divRef.current.dataset.varname;
    const cardIndex = parseInt(divRef.current.dataset.cardindex);

    dispatch({type: 'updateWords', payload: {textContent, sectionName, cardIndex}})
  }

    //add names to props content
  const content = enterNames(names, props.cardContent);
  
    //split the string by line breaks
  const words = content.split("\n");

  //construct the sanatized html string
  let newString = "<p>";
  words.forEach((phrase) => {
    newString += `${sanatize(phrase)}<br/>`;
  });
  newString += "</p>";

    //creates a dom element
  const card = React.createElement("div", {
    className: `cards ${props.className}`,
    contentEditable: "true",
    dangerouslySetInnerHTML: { __html: newString },
    ref: divRef,
    'data-varname': `${props.className}`,
    'data-cardindex': `${props.cardIndex}`,
    onBlur: saveContent
  });

  return card;
}

export default WordCards;
