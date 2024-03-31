import React from 'react'
import PopupAuth from './Auth/PopupAuth';
import PopupPrint from './Print/PopupPrint';
import PopupTemplate from './Template/PopupTemplate';
import PopupAI from './Ai/PopupAI';
import { usePopup } from '../../hooks/usePopup';

  //Main Component that holds all popup notifications
function Popup({box, subAct}){
  const { closePopup } = usePopup();
  
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