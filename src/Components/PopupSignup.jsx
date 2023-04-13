import React, {useContext, useRef, useEffect, useState} from 'react';
import { PopupContext } from './PopupAccount';

function PopupSignup(){
  const {userEmailDom, userPassDom, userNewPassDom, handleEmailInputChange, handlePasswordInputChange1, handlePasswordInputChange2} = useContext(PopupContext)



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


    </div>
  )
}

export default PopupSignup