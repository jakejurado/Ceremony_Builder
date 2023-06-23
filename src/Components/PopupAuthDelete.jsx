import React, {useContext} from 'react';
import PopupNotifications from './PopupNotifications';
import { PopupContext } from './PopupAuth';
import { fetchCall } from '../functions/fetches/api';

  //Delete user popup box
function PopupAuthDelete(){
  const {
    dispatch,
    currUser,
    setCurrUser,
    userCurrPassDom, 
    userEmailDom, 
    handleEmailInputChange, 
    handleCurrPasswordInputChange, 
    popupDispatch,
    setLoginFail,
    handleSignoffClick,
    handleResetClick,
    handleSubmitClickRef,
    buttonDom,
  } = useContext(PopupContext);

    //fetch request to delete user
  async function handleSubmitClick(){
    const email = userEmailDom.current.value;
    const password = userCurrPassDom.current.value;
    const userId = currUser
    const response = await fetchCall.delete('delete', { email, password, userId });
    if (response) {
      popupDispatch({ type: null, act: null }); // removes popup
      setCurrUser(null); //removes current user
      dispatch({type: 'reset', payload: null})
    } else {
      setLoginFail(true);
    }
  }

  handleSubmitClickRef.current = handleSubmitClick;

  return(
    <div className="entireBox" >
      <div id='signOutTab' className="eachTab selectedTab" onClick={handleSignoffClick} >Signout</div>
      <div id='passwordTab' className="eachTab selectedTab" onClick={handleResetClick}>Password</div>
      <div id='DeleteTab' className="eachTab selectedTab" style={{backgroundColor: 'red'}} >Delete</div>
      <div className="mainInput">
        <div className='signoutBox'>
          
          <h2>Delete Account</h2>

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
              password: 
            </div>
            <div className="inputDiv">
              <input className='inputContent' ref={userCurrPassDom} onChange={handleCurrPasswordInputChange} placeholder='verification code' />
            </div>
          </div>
          {<PopupNotifications />}
        </div>
      </div>

      <div className="bottomBox">
        <div className='submitButton' ref={buttonDom} >
          Delete Account
        </div>
      </div>
    </div>
  )
}

export default PopupAuthDelete