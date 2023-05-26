import React, {useContext, useRef, useEffect, useState} from 'react';
import { PopupContext } from './PopupAuth';

function PopupAuthSignup(){
  const {userEmailDom, userNewPassDom1, userNewPassDom2, handleEmailInputChange, handleNewPasswordInputChange1, handleNewPasswordInputChange2, passwordCriteria, emailCriteria, signupFail, buttonDom, popupDispatch, handleLoginTabClick} = useContext(PopupContext)

  return(
    <div className="entireBox" >
      <div id='loginTab' onClick={handleLoginTabClick} className="eachTab">Login</div>
      <div id='signupTab' className="eachTab selectedTab">signup</div>
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
            <input type='password' ref={userNewPassDom1} className='inputContent' onChange={handleNewPasswordInputChange1} placeholder='password'/>
          </div>
        </div>

        <div className = 'line moreMargin'>
          <div className="desc">
            password: 
          </div>
          <div className="inputDiv">
            <input type='password' ref={userNewPassDom2} className='inputContent' onChange={handleNewPasswordInputChange2} placeholder='password'/>
          </div>
        </div>

        <ul id='incompleteNotifications'>
          {!emailCriteria && <li id='incompleteEmailNotification' className='incomplete'>incomplete email address</li> }
          {!passwordCriteria.len && <li id='incompletePasswordNotification' className='incomplete'>password is too short</li> }
          {!passwordCriteria.match && <li id='noMatchPasswordNotification' className='incomplete'>passwords do not match</li> }
          {signupFail && <li id='signupFail' className='incomplete'>signup failed</li>}
        </ul>
      </div>

      <div className="bottomBox">
        <div className='submitButton' ref={buttonDom}>
          Submit
        </div>
      </div>
    </div>


    
  )
}

export default PopupAuthSignup