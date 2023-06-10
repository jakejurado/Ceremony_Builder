import React, {useContext, useEffect, useRef} from 'react';
import { PopupContext } from './PopupAuth';
import { fetchCall } from '../functions/fetches/api';

function PopupAuthForgot(){
  const {
    userEmailDom, 
    handleEmailInputChange, 
    emailCriteria, 
    buttonDom,
    handleSubmitClickRef,
    handleLoginTabClick, 
    handleSignupTabClick, 
    handleVerifyClick,
    setLoginFail,
    setSuccess,
  } = useContext(PopupContext);

  async function handleSubmitClick(){
    const email = userEmailDom.current.value;
    const response = await fetchCall.get('forgot', { email });
    if (response.authenticated) {
      popupDispatch({ type: 'myAuth', act: 'verify' }); 
      setSuccess(true);
    } else {
      setLoginFail(true);
    }
  }

  handleSubmitClickRef.current = handleSubmitClick;

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