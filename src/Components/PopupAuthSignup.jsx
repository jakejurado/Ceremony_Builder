import React, {useContext, useRef, useEffect, useState} from 'react';
import { PopupContext } from './PopupAuth';

function PopupAuthSignup(){
  const {userEmailDom, userPassDom, userNewPassDom, handleEmailInputChange, handlePasswordInputChange1, handlePasswordInputChange2, passwordCriteria, emailCriteria, signupFail} = useContext(PopupContext)

  return(
    <div className="mainInput">

      <div className = 'line'>
        <div className="desc">
          e-mail: 
        </div>
        <div className="inputDiv">
          <input ref={userEmailDom} className='inputContent' onChange={handleEmailInputChange} placeholder='email'/>
        </div>
      </div>
      
      <div className = 'line'>
        <div className="desc">
          password: 
        </div>
        <div className="inputDiv">
          <input type='password' ref={userPassDom} className='inputContent' onChange={handlePasswordInputChange1} placeholder='password'/>
        </div>
      </div>

      <div className = 'line moreMargin'>
        <div className="desc">
          password: 
        </div>
        <div className="inputDiv">
          <input type='password' ref={userNewPassDom} className='inputContent' onChange={handlePasswordInputChange2} placeholder='password'/>
        </div>
      </div>

      <ul id='incompleteNotifications'>
        {!emailCriteria && <li id='incompleteEmailNotification' className='incomplete'>incomplete email address</li> }
        {!passwordCriteria.len && <li id='incompletePasswordNotification' className='incomplete'>password is too short</li> }
        {!passwordCriteria.match && <li id='noMatchPasswordNotification' className='incomplete'>passwords do not match</li> }
        {signupFail && <li id='signupFail' className='incomplete'>signup failed</li>}
      </ul>


    </div>
  )
}

export default PopupAuthSignup