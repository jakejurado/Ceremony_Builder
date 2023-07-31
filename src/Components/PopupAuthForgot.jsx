import React, {useContext, useEffect, useRef} from 'react';
import { PopupContext } from './PopupAuth';
import { fetchCall } from '../functions/fetches/api';

  //forgot password popup box
function PopupAuthForgot(){
  const {
    userEmailDom, 
    handleEmailInputChange, 
    emailCriteria, 
    buttonDom,
    handleSubmitClickRef,
    handleLoginTabClick, 
    handleSignupTabClick, 
    popupDispatch,
    setLoginFail,
    setSuccess,
  } = useContext(PopupContext);

    //fetch to start the email reset process
  async function handleSubmitClick(){
    const email = userEmailDom.current.value;
    const response = await fetchCall.put('forgot', { email });
    if (response.isPasswordReset) {
      popupDispatch({ type: 'myAuth', subAct: 'login' }); 
      setSuccess(true);
    } else {
      setLoginFail(true);
    }
  }

  handleSubmitClickRef.current = handleSubmitClick;

  return(
    <div className="entireBox" >
      <div id='loginTab' className="eachTab" onClick={handleLoginTabClick}>login</div>
      <div id='signupTab' className="eachTab" onClick={handleSignupTabClick}>signup</div>

      <form>
        <div className="mainInput">

          <div className='lineInstructions'>
            Enter your email associated with your account and then submit.  You will be provided a code to change your password.
          </div>
          
          
          <div className='line'>
            <div className="inputDiv">
              <input className='inputContent' ref={userEmailDom} onChange={handleEmailInputChange} placeholder='e-mail' />
            </div>
          </div>

          <ul id='incompleteNotifications'>
            {!emailCriteria && <li id='incompleteEmailNotification' className='incomplete'>incomplete email address</li> }
          </ul>
          
        </div>
      </form>
      <div className="bottomBox">
        <button className='submitButton' ref={buttonDom}>
          Submit
        </button>
      </div>
    </div>


    
  )
}

export default PopupAuthForgot