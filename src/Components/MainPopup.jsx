import React, {useContext, createContext, useRef, useReducer, useEffect, useMemo, useState} from 'react'
import { GlobalContext} from "./App";
import MainAuth from './MainAuth';
import MainPrint from './MainPrint';


function MainPopup({box, subAct}){
  console.log('enter MainPopup')
  const {popupDispatch} = useContext(GlobalContext)

  //connects with parent state that displays the popup and removes it.
  function handleBackgroundClick(){
    popupDispatch({type: null, box: null});
  }

  console.log({box, subAct})
  
  return(
      <div id='popupContainer'>
        <div id='popupBackground' onClick={handleBackgroundClick}></div>
        {box === 'myAuth' && <MainAuth subAct={subAct}/> }
        {box === 'myPrint' && <MainPrint />}
        
      </div>
  )
}


export default MainPopup;