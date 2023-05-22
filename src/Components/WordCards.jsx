import React, { useContext, useRef, useEffect } from "react";
import { GlobalContext } from "./App";
import { enterNames } from "../functions/sections/names";
import { sanatize } from "../functions/sanatize";

function WordCards(props) {
  const { names, templateTitle, templates, setTemplates, dispatch } = useContext(GlobalContext);
  const divRef = useRef(null);

  function saveContent(){
    console.log('onBlur');
    const textContent = divRef.current.textContent;
    const sectionName = divRef.current.dataset.varname;
    const cardIndex = parseInt(divRef.current.dataset.cardindex);

    dispatch({type: 'updateWords', payload: {textContent, sectionName, cardIndex}})
  }

  //on mount...
  // useEffect(() => {
  //   // Div is clicked, add event listener to listen for a second click
  //   const handleFirstClick = (event) => {
  //     if (divRef.current && divRef.current.contains(event.target)) {
  //       document.addEventListener("mousedown", handleSecondClick);
  //     }
  //   };

  //   // Second click is outside the div, update state with the new contents
  //   const handleSecondClick = (event) => {
  //     if (!divRef.current || !divRef.current.contains(event.target)) {
        
  //       const textContent = divRef.current.textContent;
  //       const sectionName = divRef.current.dataset.varname;
  //       const cardIndex = parseInt(divRef.current.dataset.cardindex);

  //       dispatch({type: 'updateWords', payload: {textContent, sectionName, cardIndex}})
    
  //       // Remove the event listener after running the function
  //       document.removeEventListener("mousedown", handleSecondClick);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleFirstClick);

  //   return () => {
  //     document.removeEventListener("mousedown", handleFirstClick);
  //     document.removeEventListener("mousedown", handleSecondClick);
  //   };
  // }, []);

  //add names to props content
  const content = enterNames(names, props.cardContent);
  
  //split the string by line breaks
  const words = content.split("\n");

  //construct the sanatized html string
  // function createHTMLstring(phrases) {}
  let newString = "<p>";
  words.forEach((phrase) => {
    newString += `${sanatize(phrase)}<br/>`;
  });
  newString += "</p>";

  const card = React.createElement("div", {
    className: `cards ${props.className}`,
    contentEditable: "true",
    dangerouslySetInnerHTML: { __html: newString },
    ref: divRef,
    'data-varname': `${props.className}`,
    'data-cardindex': `${props.cardIndex}`,
    onBlur: saveContent
  });

  // const danger = { __html: newString };

  return card;
}

export default WordCards;
