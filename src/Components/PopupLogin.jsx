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
          <input className='inputContent' ref={userEmailDom} onChange={handleEmailInputChange} />
        </div>
      </div>
      
      <div className = 'line'>
        <div className="desc">
          password: 
        </div>
        <div className="inputDiv">
          <input className='inputContent' ref={userPassDom} onChange={handlePasswordInputChange1} />
        </div>
      </div>
      
      <div className='lefty' onClick={handleClick}>forgot password? </div>
    </div>
  )
}

export default PopupLogin