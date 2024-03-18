import React, {useContext, useCallback} from 'react'
import PopupAuth from './PopupAuth';
import PopupPrint from './PopupPrint';
import PopupTemplate from './PopupTemplate';
import PopupAI from './PopupAI';
import {PopupContext} from '../context/PopupProvider';

  //Main Component that holds all popup notifications
function Popup({box, subAct}){
  const { closePopup } = PopupContext();

  
  return(
      <div id='popupContainer'>
        <div id='popupWhiteBackground' onClick={closePopup}></div>
        {box === 'myAuth' && <PopupAuth subAct={subAct}/> }
        {box === 'myPrint' && <PopupPrint />}
        {box === 'myTemplates' && <PopupTemplate />}
        {box === 'boxAI' && <PopupAI  subAct={subAct} />}
      </div>
  )
}


export default Popup;