import React, {useContext, useState} from 'react';
import { PopupContext } from './PopupAuth'; 


function PopupAuthSignout(){
  const {popupDispatch, setCurrUser, handleDeleteClick, handleResetClick} = useContext(PopupContext)
  
  function handleSubmitClick(){
    setCurrUser(null);
    popupDispatch({box: null, subAct: null})
  }

  return(
    <div className="entireBox" >
      <div id='signOutTab' className="eachTab selectedTab">Signout</div>
      <div id='passwordTab' className="eachTab" onClick={handleResetClick} >Password</div>
      <div id='DeleteTab' className="eachTab" onClick={handleDeleteClick} >Delete</div>


      <div className="mainInput">
        <div className="signoutBox">
          <h2>Signout</h2>
          <p>aka: logout, signoff, logoff...</p>
          <button 
          className='submitButton buttonActive acctButton'
          onClick={handleSubmitClick}
          >
            Signout
          </button>
        </div>
      </div>

    </div>
  )

}

export default PopupAuthSignout