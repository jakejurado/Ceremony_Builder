import React, {useState, useRef, useContext} from "react";
import { GlobalContext } from "./App";

function PopupAI_Results({subAct, aiResponse}){
  const {popupDispatch, dispatch} = useContext(GlobalContext)

  function handleSubmitClick(){
      //remove the popup
    popupDispatch({box: null, subAct: null})

      //update card script
    dispatch({type: 'updateWords', payload: {textContent: aiResponse, sectionName: subAct.varname, cardIndex: subAct.cardIndex}})
  }
  

  return(
    <>
      <div id='aiScript'>
        <p>{aiResponse}</p>
      </div>
      <button className='boxButton' onClick={handleSubmitClick}>Accept</button>
    </>
  )
}

export default PopupAI_Results
