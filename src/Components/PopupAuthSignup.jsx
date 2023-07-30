import React, {useContext} from 'react';
import PopupNotifications from './PopupNotifications';
import { PopupContext } from './PopupAuth';
import { fetchCall } from '../functions/fetches/api';

  //signup popup box
function PopupAuthSignup(){
  const {userEmailDom, 
    userNewPassDom1, 
    userNewPassDom2, 
    handleEmailInputChange, 
    handleNewPasswordInputChange1, 
    handleNewPasswordInputChange2, 
    popupDispatch, 
    handleLoginTabClick,
    setSuccess,
    handleSubmitClickRef,
    buttonDom,
    setLoginFail
  } = useContext(PopupContext)

    //fetch request to signup
  async function handleSubmitClick(){
    const email = userEmailDom.current.value;
    const password = userNewPassDom1.current.value;
    const password2 = userNewPassDom2.current.value
    const response = await fetchCall.post('signup', { email, password });
    if (response.authenticated) {
      popupDispatch({type: 'myAuth', subAct: 'login'}); // 
      setSuccess(true);
    } else {
      setLoginFail(true);
    }
  }

  handleSubmitClickRef.current = handleSubmitClick;

  return(
    <div className="entireBox" >
      <div id='loginTab' onClick={handleLoginTabClick} className="eachTab selectedTab">login</div>
      <div id='signupTab' className="eachTab">signup</div>
      <form>
        <div className="mainInput">

          <div className = 'line'>
            {/* <div className="desc">
              e-mail: 
            </div> */}
            <div className="inputDiv">
              <input ref={userEmailDom} className='inputContent' onChange={handleEmailInputChange} placeholder='email' autoComplete="username"/>
            </div>
          </div>

          <div className = 'line'>
            {/* <div className="desc">
              password: 
            </div> */}
            <div className="inputDiv">
              <input type='password' ref={userNewPassDom1} className='inputContent' onChange={handleNewPasswordInputChange1} placeholder='password' autoComplete="new-password"/>
            </div>
          </div>

          <div className = 'line moreMargin'>
            {/* <div className="desc">
              password: 
            </div> */}
            <div className="inputDiv">
              <input type='password' ref={userNewPassDom2} className='inputContent' onChange={handleNewPasswordInputChange2} placeholder='password' autoComplete="new-password"/>
            </div>
          </div>

          {<PopupNotifications />}
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

export default PopupAuthSignup