import React, {useContext, useState, useEffect} from 'react';
import { PopupContext } from "./PopupAccount";


function PopupLogin(){
  const {dispatch, userEmailDom, userPassDom, handleEmailInputChange, handlePasswordInputChange1, passwordCriteria, emailCriteria, loginFail} = useContext(PopupContext)

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

      <ul id='incompleteNotifications'>
        {!emailCriteria && <li id='incompleteEmailNotification' className='incomplete'>incomplete email address</li> }
        {!passwordCriteria.len && <li id='incompletePasswordNotification' className='incomplete'>password is too short</li> }
        {loginFail && <li id='loginfail' className='incomplete'>incorrect email or password</li>}
      </ul>
      
      <div className='lefty' onClick={handleClick}>forgot password? </div>
    </div>
  )
}

export default PopupLogin