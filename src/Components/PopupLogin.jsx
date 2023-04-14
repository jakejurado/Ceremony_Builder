import React, {useContext, useState, useEffect} from 'react';
import { PopupContext } from "./PopupAccount";


function PopupLogin(){
  const {dispatch, setSubmitReady, userEmailDom, userPassDom, handleEmailInputChange, handlePasswordInputChange1, handlePasswordInputChange2, handleCodeInputChange} = useContext(PopupContext)

  function handleClick(){
    console.log(dispatch)
    dispatch({type:'forgot'})
  }
 

  return(
    <div className="mainInput">

      <div className = 'line'>
        <div className="desc">
          e-mail: 
        </div>
        <div className="inputDiv">
          <input className='inputContent' ref={userEmailDom} onChange={handleEmailInputChange} placeholder='email'/>
        </div>
      </div>
      
      <div className = 'line'>
        <div className="desc">
          password: 
        </div>
        <div className="inputDiv">
          <input type='password' className='inputContent' ref={userPassDom} onChange={handlePasswordInputChange1} placeholder='password'/>
        </div>
      </div>

      <div id='incompleteNotifications'>
        <div id='incompleteEmailNotification' className='incomplete'>incomplete email address</div>
        <div id='incompletePasswordNotification' className='incomplete'>password is too short</div>
      </div>
      
      <div className='lefty' onClick={handleClick}>forgot password? </div>
    </div>
  )
}

export default PopupLogin