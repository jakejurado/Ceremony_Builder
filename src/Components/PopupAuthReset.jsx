import React, {useContext, useRef, useEffect} from 'react';
import PopupNotifications from './PopupNotifications';
import { PopupContext } from './PopupAuth';
import { fetchCall } from '../functions/api';


function PopupAuthReset(){
  const {
    currUser,
    userCurrPassDom, 
    userEmailDom, 
    userNewPassDom1, 
    userNewPassDom2, 
    handleEmailInputChange, 
    handleCurrPasswordInputChange, 
    handleNewPasswordInputChange1, 
    handleNewPasswordInputChange2, 
    setSuccess,
    setLoginFail,
    handleDeleteClick,
    handleSignoffClick,
    handleSubmitClickRef,
    buttonDom,
  } = useContext(PopupContext);

  async function handleSubmitClick(){
    const userId = currUser
    const email = userEmailDom.current.value;
    const password = userCurrPassDom.current.value;
    const newPassword = userNewPassDom1.current.value;
    const newPassword2 = userNewPassDom2.current.value
    const response = await fetchCall.put('reset', { email, password, newPassword, userId});
    console.log({response})
    if (response.isPasswordReset) {
      setSuccess(true)
    } else {
      setLoginFail(true);
    }
  }

  handleSubmitClickRef.current = handleSubmitClick;

  return(
    <div className="entireBox" >
      <div id='signOutTab' className="eachTab" onClick={handleSignoffClick} >Signout</div>
      <div id='passwordTab' className="eachTab selectedTab">Password</div>
      <div id='DeleteTab' className="eachTab" onClick={handleDeleteClick} >Delete</div>
      <div className="mainInput">
        <div className='signoutBox'>
          
          <h2>Reset Password</h2>

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
              current password: 
            </div>
            <div className="inputDiv">
              <input className='inputContent' ref={userCurrPassDom} onChange={handleCurrPasswordInputChange} placeholder='verification code' />
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

          {<PopupNotifications />}

        </div>
      </div>

      <div className="bottomBox">
        <div className='submitButton' ref={buttonDom}>
          Submit
        </div>
      </div>
    </div>
  )

}

export default PopupAuthReset