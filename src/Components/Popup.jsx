import React, {useContext, useCallback} from 'react'
import { GlobalContext} from "./App";
import PopupAuth from './PopupAuth';
import PopupPrint from './PopupPrint';
import PopupTemplate from './PopupTemplate';
import PopupAI from './PopupAI';

  //Main Component that holds all popup notifications
function Popup({box, subAct}){
  const {popupDispatch} = useContext(GlobalContext)

    //connects with parent state that displays the popup and removes it.
  const handleBackgroundClick = useCallback(() =>{
    popupDispatch({type: null, box: null});
  }, [])
  
  return(
      <div id='popupContainer'>
        <div id='popupWhiteBackground' onClick={handleBackgroundClick}></div>
        {box === 'myAuth' && <PopupAuth subAct={subAct}/> }
        {box === 'myPrint' && <PopupPrint />}
        {box === 'myTemplates' && <PopupTemplate />}
        {box === 'boxAI' && <PopupAI  subAct={subAct} />}
      </div>
  )
}


export default Popup;