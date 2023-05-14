import React, { useContext } from "react";
import { GlobalContext } from "./App";
import { enterNames } from "../functions/sections/names";
import { sanatize } from "../functions/sanatize";

function WordCards(props) {
  const { names, templateTitle, templates, setTemplates } = useContext(GlobalContext);

  //add names to props content
  const content = enterNames(names, props.cardContent);
  //split the string by line breaks
  const words = content.split("\n");

  //takes the user input and puts it into the template
  function handleInput(e){
    const innerText = e.target.innerText;
    console.log(templateTitle);
    console.log(innerText);
    console.log(e.target.dataset.varname);

    const templatesCopy = JSON.parse(JSON.stringify(templates));
    templatesCopy[templateTitle][e.target.dataset.varname].script[0] = e.target.dataset.innerText 
    // setTemplates(templatesCopy)

    // dispatch({type: 'saveTemplate', payload: {updatedTemplate = templatesCopy}})
  }

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
    onInput: handleInput,
    'data-varname': `${props.className}`
  });

  const danger = { __html: newString };

  return card;
}

export default WordCards;
