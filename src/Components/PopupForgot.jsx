import React, {useContext, useEffect, useState} from 'react';
import { PopupContext } from './PopupAccount';

function PopupForgot(){
  const {dispatch, userEmailDom, handleEmailInputChange} = useContext(PopupContext);

  //changes popup to verify popup.
  function handleClick(){
    console.log(dispatch)
    dispatch({type:'verify'})
  }

  return(
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
      
      <div className="lefty" onClick={handleClick}>I have the code</div>
    </div>
  )
}

export default PopupForgot