import React, { useState, useEffect } from "react";
import { enterNames } from "../../functions/sections/names";
import { useTemplates } from "../../hooks/useTemplates";
import { useScreen } from "../../hooks/useScreen";

  //Displays main content/scripts of each section
function SectionsWordCards({cardContent, className, cardIndex, cardDivRef, saveContent, handleCardDisplay}) {

  const { names } = useTemplates();
  const { isMobile } = useScreen();

  const [textValue, setTextValue] = useState(enterNames(names, cardContent));

  //mobile functionality
  function expandCardMobile(e){
    const dom = findBaseDom(e, 'section') 
    const secIndex = dom.dataset.index
    if(isMobile){
      
      handleCardDisplay(secIndex)
    }
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
