import React, {useContext} from 'react';
import { PopupContext } from './PopupAuth';


function PopupAuthDelete(){
  const {userCurrPassDom, userEmailDom, handleEmailInputChange, handleCurrPasswordInputChange, emailCriteria, passwordCriteria, codeCriteria, buttonDom, popupDispatch} = useContext(PopupContext);

  function handleSignoffClick() {
    popupDispatch({type:'myAuth', subAct: 'signout'})
  }

  function handleResetClick(){
    popupDispatch({type: 'myAuth', subAct: 'reset'})
  }

  <div id='passwordTab' className="eachTab" onClick={handleResetClick} >Password</div>


  return(
    <div className="entireBox" >
      <div id='signOutTab' className="eachTab" onClick={handleSignoffClick} >Signout</div>
      <div id='passwordTab' className="eachTab" onClick={handleResetClick}>Password</div>
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

          <ul id='incompleteNotifications'>
            {!emailCriteria && <li id='incompleteEmailNotification' className='incomplete'>incomplete email address</li> }
            {!passwordCriteria.len && <li id='incompletePasswordNotification' className='incomplete'>password is too short</li> }
            {!passwordCriteria.match && <li id='noMatchPasswordNotification' className='incomplete'>passwords do not match</li> }
            {!codeCriteria && <li id='noMatchPasswordNotification' className='incomplete'>passwords do not match</li> }
          </ul>

          
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