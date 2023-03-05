import React, { useContext } from "react";
import { GlobalContext } from "./App";
import { enterNames } from "../functions/sections/names";
import { sanatize } from "../functions/sanatize";

function WordCards(props) {
  const { names } = useContext(GlobalContext);

  //add names to props content
  const content = enterNames(names, props.cardContent);
  //split the string by line breaks
  const words = content.split("\n");

  //construct the sanatized html string
  function createHTMLstring(phrases) {}
  let newString = "<p>";
  words.forEach((phrase) => {
    newString += `${sanatize(phrase)}<br/>`;
  });
  newString += "</p>";

  const card = React.createElement("div", {
    className: `cards ${props.className}`,
    contentEditable: "true",
    dangerouslySetInnerHTML: { __html: newString },
  });

  const danger = { __html: newString };

  return card;
}

export default WordCards;
