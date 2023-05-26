import React, {useContext} from 'react';
import { PopupContext } from './PopupAuth';


function PopupAuthReset(){
  const {userCurrPassDom, userEmailDom, userNewPassDom1, userNewPassDom2, handleEmailInputChange, handleCurrPasswordInputChange, handleNewPasswordInputChange1, handleNewPasswordInputChange2, emailCriteria, passwordCriteria, codeCriteria, buttonDom, popupDispatch} = useContext(PopupContext);

  function handleDeleteClick(){
    popupDispatch({type: 'myAuth', subAct: 'delete'})
  }

  function handleSignoffClick(){
    popupDispatch({type:'myAuth', subAct: 'signout'})
  }

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

          <ul id='incompleteNotifications'>
            {!emailCriteria && <li id='incompleteEmailNotification' className='incomplete'>incomplete email address</li> }
            {!passwordCriteria.len && <li id='incompletePasswordNotification' className='incomplete'>password is too short</li> }
            {!passwordCriteria.match && <li id='noMatchPasswordNotification' className='incomplete'>passwords do not match</li> }
            {!codeCriteria && <li id='noMatchPasswordNotification' className='incomplete'>passwords do not match</li> }
          </ul>

          
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