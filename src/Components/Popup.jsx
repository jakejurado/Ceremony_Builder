import React, {useContext, createContext, useRef, useReducer, useEffect, useMemo, useState} from 'react'
import { GlobalContext} from "./App";
import PopupAuth from './PopupAuth';
import PopupPrint from './PopupPrint';
import PopupTemplate from './PopupTemplate';


function Popup({box, subAct}){
  const {popupDispatch} = useContext(GlobalContext)

  //connects with parent state that displays the popup and removes it.
  function handleBackgroundClick(){
    popupDispatch({type: null, box: null});
  }

  
  return(
      <div id='popupContainer'>
        <div id='popupWhiteBackground' onClick={handleBackgroundClick}></div>
        {box === 'myAuth' && <PopupAuth subAct={subAct}/> }
        {box === 'myPrint' && <PopupPrint />}
        {box === 'myTemplates' && <PopupTemplate />}
        
      </div>
  )
}


export default Popup;