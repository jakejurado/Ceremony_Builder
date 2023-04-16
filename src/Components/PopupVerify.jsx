import React, {useContext, useEffect, useState} from 'react';
import { PopupContext } from "./PopupAccount";
import { passwordCriteria, validateEmail } from '../functions/account/password';

function PopupVerify(){
  const {dispatch, userCodeDom, userEmailDom, userNewPassDom, userPassDom, handleEmailInputChange, handlePasswordInputChange1, handlePasswordInputChange2, handleCodeInputChange, emailCriteria, passwordCriteria, codeCriteria} = useContext(PopupContext);

  //changes popup to forgot popup
  function handleClick(){
    dispatch({type:'forgot'})
  }

  return(
    <div className="mainInput">

      <div className= 'line'>
        <div className="desc">
          email: 
        </div>
        <div className="inputDiv">
          <input className='inputContent' ref={userEmailDom} onChange={handleEmailInputChange} placeholder='e-mail'/>
        </div>
      </div>

      <div className= 'line'>
        <div className="desc">
          verification code: 
        </div>
        <div className="inputDiv">
          <input className='inputContent' ref={userCodeDom} onChange={handleCodeInputChange} placeholder='verification code' />
        </div>
      </div>
      
      <div className= 'line'>
        <div className="desc">
          new password: 
        </div>
        <div className="inputDiv">
          <input className='inputContent' type='password' ref={userPassDom} onChange={handlePasswordInputChange1} placeholder='password' />
        </div>
      </div>


      <div className= 'line depth'>
        <div className="desc">
          new password: 
        </div>
        <div className="inputDiv">
          <input className='inputContent' type='password' ref={userNewPassDom} onChange={handlePasswordInputChange2} placeholder='password' />
        </div>
      </div>

      <div className="lefty" onClick={handleClick}>
        go back
      </div>

      <ul id='incompleteNotifications'>
        {!emailCriteria && <li id='incompleteEmailNotification' className='incomplete'>incomplete email address</li> }
        {!passwordCriteria.len && <li id='incompletePasswordNotification' className='incomplete'>password is too short</li> }
        {!passwordCriteria.match && <li id='noMatchPasswordNotification' className='incomplete'>passwords do not match</li> }
        {!codeCriteria && <li id='noMatchPasswordNotification' className='incomplete'>passwords do not match</li> }
      </ul>
      
    </div>
  )
}

export default PopupVerify