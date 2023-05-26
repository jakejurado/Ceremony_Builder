import React, {useContext, useState, useEffect} from 'react';
import { PopupContext } from './PopupAuth';


function PopupAuthLogin(){
  const {userEmailDom, userCurrPassDom, handleEmailInputChange, handleCurrPasswordInputChange, passwordCriteria, emailCriteria, loginFail, buttonDom, handleForgotClick, handleSignupTabClick} = useContext(PopupContext)

  

  return(
    <div className="entireBox" >
      <div id='loginTab' className="eachTab selectedTab">Login</div>
      <div id='signupTab' onClick={handleSignupTabClick} className="eachTab">signup</div>
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
            <input type='password' className='inputContent' ref={userCurrPassDom} onChange={handleCurrPasswordInputChange} placeholder='password'/>
          </div>
        </div>

        <ul id='incompleteNotifications'>
          {!emailCriteria && <li id='incompleteEmailNotification' className='incomplete'>incomplete email address</li> }
          {!passwordCriteria.len && <li id='incompletePasswordNotification' className='incomplete'>password is too short</li> }
          {loginFail && <li id='loginfail' className='incomplete'>incorrect email or password</li>}
        </ul>
        
        <div className='lefty' onClick={handleForgotClick}>forgot password? </div>
      </div>
      <div className="bottomBox">
        <div className='submitButton' ref={buttonDom}>
          Submit
        </div>
      </div>
    </div>
  )
}

export default PopupAuthLogin