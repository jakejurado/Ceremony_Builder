import React, {useContext, useEffect, useState} from 'react';
import { PopupContext } from "./PopupAccount";
import { passwordCriteria, validateEmail } from '../functions/account/password';

function PopupVerify(){
  const {dispatch, userCodeDom, userEmailDom, userNewPassDom, userPassDom, handleEmailInputChange, handlePasswordInputChange1, handlePasswordInputChange2, handleCodeInputChange} = useContext(PopupContext);

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
          <input className='inputContent' ref={userEmailDom} onChange={handleEmailInputChange} />
        </div>
      </div>

      <div className= 'line'>
        <div className="desc">
          verification code: 
        </div>
        <div className="inputDiv">
          <input className='inputContent' ref={userCodeDom} onChange={handleCodeInputChange} />
        </div>
      </div>
      
      <div className= 'line'>
        <div className="desc">
          new password: 
        </div>
        <div className="inputDiv">
          <input className='inputContent' ref={userPassDom} onChange={handlePasswordInputChange2} />
        </div>
      </div>


      <div className= 'line depth'>
        <div className="desc">
          new password: 
        </div>
        <div className="inputDiv">
          <input className='inputContent' ref={userNewPassDom} onChange={handlePasswordInputChange2} />
        </div>
      </div>

      <div className="lefty" onClick={handleClick}>
        go back
      </div>
      
    </div>
  )
}

export default PopupVerify