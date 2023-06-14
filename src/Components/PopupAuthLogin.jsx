import React, {useContext} from 'react';
import { PopupContext } from './PopupAuth';
import { fetchCall } from '../functions/fetches/api';

function PopupAuthLogin(){
  const {
    userEmailDom, 
    userCurrPassDom, 
    handleEmailInputChange, 
    handleCurrPasswordInputChange, 
    passwordCriteria, 
    emailCriteria, 
    loginFail, 
    success,
    handleForgotClick, 
    handleSignupTabClick, 
    setLoginFail, 
    setCurrUser, 
    popupDispatch, 
    buttonDom,
    handleSubmitClickRef,
  } = useContext(PopupContext)

  async function handleSubmitClick(){
    const email = userEmailDom.current.value;
    const password = userCurrPassDom.current.value;
    const response = await fetchCall.get('login', { email, password });
    if (response.authenticated) {
      setCurrUser(response.userId); // updates user
      popupDispatch({ type: null, act: null }); // removes popup
    } else {
      setLoginFail(true); //updates loginFail
    }
  }
    
  handleSubmitClickRef.current = handleSubmitClick;
  
  return(
    <div className="entireBox" >
      <div id='loginTab' className="eachTab selectedTab">login</div>
      <div id='signupTab' onClick={handleSignupTabClick} className="eachTab">signup</div>
      <form>
        <div className="mainInput">
          <div className = 'line'>
            <div className="desc">
              e-mail: 
            </div>
            <div className="inputDiv">
              <input className='inputContent' ref={userEmailDom} onChange={handleEmailInputChange} placeholder='email' autoComplete="username" />
            </div>
          </div>
          
          <div className = 'line'>
            <div className="desc">
              password: 
            </div>
            <div className="inputDiv">
              <input type='password' className='inputContent' ref={userCurrPassDom} onChange={handleCurrPasswordInputChange} placeholder='password' autoComplete="current-password" />
            </div>
          </div>

          <ul id='incompleteNotifications'>
            {!emailCriteria && <li id='incompleteEmailNotification' className='incomplete'>incomplete email address</li> }
            {!passwordCriteria.len && <li id='incompletePasswordNotification' className='incomplete'>password is too short</li> }
            {loginFail && <li id='loginfail' className='incomplete'>incorrect email or password</li>}
            {success && <li id='success' className='complete'>success</li>}
          </ul>

          
          <div className='lefty' onClick={handleForgotClick}>forgot password? </div>
        </div>
      </form>
      <div className="bottomBox">
        <div className='submitButton' id='authLoginsubmitButton' ref={buttonDom}>
          Submit
        </div>
      </div>
    </div>
  )
}

export default PopupAuthLogin