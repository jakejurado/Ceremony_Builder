import React, {useContext, useEffect, useState} from 'react';
import { PopupContext } from './PopupAuth';
import { passwordCriteria, validateEmail } from '../functions/account/password';

function PopupAuthVerify(){
  const {userCodeDom, userEmailDom, userNewPassDom1, userNewPassDom2, handleEmailInputChange, handleCodeInputChange, handleNewPasswordInputChange1, handleNewPasswordInputChange2, emailCriteria, passwordCriteria, codeCriteria, buttonDom, handleLoginTabClick, handleSignupTabClick, handleForgotClick} = useContext(PopupContext);


  return(
    <div className="entireBox" >
      <div id='loginTab' className="eachTab" onClick={handleLoginTabClick}>Login</div>
      <div id='signupTab' className="eachTab" onClick={handleSignupTabClick}>signup</div>

      

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
            <input className='inputContent' type='password' ref={userNewPassDom1} onChange={handleNewPasswordInputChange1} placeholder='password' />
          </div>
        </div>


        <div className= 'line depth'>
          <div className="desc">
            new password: 
          </div>
          <div className="inputDiv">
            <input className='inputContent' type='password' ref={userNewPassDom2} onChange={handleNewPasswordInputChange2} placeholder='password' />
          </div>
        </div>

        <div className="lefty" onClick={handleForgotClick}>
          go back
        </div>

        <ul id='incompleteNotifications'>
          {!emailCriteria && <li id='incompleteEmailNotification' className='incomplete'>incomplete email address</li> }
          {!passwordCriteria.len && <li id='incompletePasswordNotification' className='incomplete'>password is too short</li> }
          {!passwordCriteria.match && <li id='noMatchPasswordNotification' className='incomplete'>passwords do not match</li> }
          {!codeCriteria && <li id='noMatchPasswordNotification' className='incomplete'>passwords do not match</li> }
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

export default PopupAuthVerify