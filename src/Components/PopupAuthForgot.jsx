import React, {useContext, useEffect, useState} from 'react';
import { PopupContext } from './PopupAuth';

function PopupAuthForgot(){
  const {popupBoxDispatch, userEmailDom, handleEmailInputChange, emailCriteria, buttonDom, handleLoginTabClick, handleSignupTabClick, handleVerifyClick} = useContext(PopupContext);


  return(
    <div className="entireBox" >
      <div id='loginTab' className="eachTab" onClick={handleLoginTabClick}>Login</div>
      <div id='signupTab' className="eachTab" onClick={handleSignupTabClick}>signup</div>

      <div className="mainInput">

        <div className='lineInstructions'>
          Enter your email associated with your account and then submit.  You will be provided a code to change your password.
        </div>
        
        
        <div className='line'>
          <div className="desc">
            e-mail: 
          </div>
          <div className="inputDiv">
            <input className='inputContent' ref={userEmailDom} onChange={handleEmailInputChange} placeholder='e-mail' />
          </div>
        </div>

        <ul id='incompleteNotifications'>
          {!emailCriteria && <li id='incompleteEmailNotification' className='incomplete'>incomplete email address</li> }
        </ul>
        
        <div className="lefty" onClick={handleVerifyClick}>I have the code</div>
      </div>
      <div className="bottomBox">
        <div className='submitButton' ref={buttonDom}>
          Submit
        </div>
      </div>
    </div>


    
  )
}

export default PopupAuthForgot