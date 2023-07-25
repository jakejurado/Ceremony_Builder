import React, { useContext, useRef, useState, useEffect } from "react";
import { GlobalContext } from "./App";
import { enterNames } from "../functions/sections/names";
import { sanatize } from "../functions/wordCards/sanatize";
import { formatCards } from "../functions/wordCards/formatCards";
// import { useSwipeable, onSwipedRight, onSwipedLeft } from 'react-swipeable';
// import ButtonClose from "./ButtonClose"

  //Displays main content/scripts of each section
function SectionsWordCards({cardContent, className, cardIndex, cardDivRef, saveContent, cardDisplay, handleCardDisplay}) {
  const { names } = useContext(GlobalContext);

  const [textValue, setTextValue] = useState(enterNames(names, cardContent));

  //mobile functionality
  function expandCardMobile(e){
    const dom = findBaseDom(e, 'section') 
    const secIndex = dom.dataset.index
    
    handleCardDisplay(secIndex)
  }

    //add names to props content
  const content = enterNames(names, cardContent);

    //climb up the dom tree to find   the class.
  function findBaseDom(e, targetClass){
    let node = e.target.parentNode.parentNode.parentNode;
    if(!node.classList.contains(targetClass)){
      node = node.parentNode;
    }
    return node
  }

  const handleChange = (e) => {
    setTextValue(e.target.value);
  };


  useEffect(()=>{
    setTextValue(content)
  }, [cardContent, names])


  return (
    <textarea 
      ref={cardDivRef} 
      className={`cards ${className}`}
      onClick = {expandCardMobile}
      data-varname ={`${className}`}
      data-cardindex= {`${cardIndex}`}
      onBlur = {saveContent}
      value = {textValue}
      onChange ={handleChange}
    >
    </textarea> 
  )
}

export default SectionsWordCards
