import React, { useContext, useRef, useState } from "react";
import { GlobalContext } from "./App";
import { enterNames } from "../functions/sections/names";
import { sanatize } from "../functions/wordCards/sanatize";
import { formatCards } from "../functions/wordCards/formatCards";
// import { useSwipeable, onSwipedRight, onSwipedLeft } from 'react-swipeable';
// import ButtonClose from "./ButtonClose"

  //Displays main content/scripts of each section
function WordCards({cardContent, className, cardIndex, cardDivRef, saveContent}) {
  const { names } = useContext(GlobalContext);

    //add names to props content
  const content = enterNames(names, cardContent);
  
    //split the string by line breaks
  const words = content.split("\n");

  //mobile functionality
  function expandCardMobile(e){
    const dom = findBaseDom(e, 'section')
    dom.classList.add('section-mobile')

    //remove the div that hides the close button
    const domButton = dom.querySelector('.cButtonImg');
    domButton.classList.remove('hide-element')
  }

    //climb up the dom tree to find the class.
  function findBaseDom(e, targetClass){
    let node = e.target.parentNode.parentNode.parentNode;
    if(!node.classList.contains(targetClass)){
      node = node.parentNode;
    }
    return node
  }

  const paragraphs = []
  words.forEach((phrase)=>{
    const currentContent = sanatize(phrase)
    paragraphs.push(<p>{currentContent}</p>)
  })

    //construct the sanatized html string
  let newString = "<p>";
  words.forEach((phrase) => {
    newString += `${sanatize(phrase)}<br/>`;
  });
  newString += "</p>";

    //creates a dom element
  const card = React.createElement("div", {
    className: `cards ${className}`,
    contentEditable: "true",
    onClick: expandCardMobile,
    dangerouslySetInnerHTML: { __html: newString },
    ref: cardDivRef,
    'data-varname': `${className}`,
    'data-cardindex': `${cardIndex}`,
    onBlur: saveContent,
  });

  return card;
}

export default WordCards
