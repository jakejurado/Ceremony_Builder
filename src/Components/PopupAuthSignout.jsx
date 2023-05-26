import React, {useContext, useState} from 'react';
import { PopupContext } from './PopupAuth'; 
import { GlobalContext } from './App';


function PopupAuthSignout(){
  const {popupDispatch, setCurrUser} = useContext(PopupContext)

  console.log({setCurrUser})
  
  function handleSubmitClick(){
    setCurrUser(null);
    popupDispatch({box: null, subAct: null})
  }

  function handleDeleteClick(){
    popupDispatch({type: 'myAuth', subAct: 'delete'})
  }

  function handleResetClick(){
    popupDispatch({type: 'myAuth', subAct: 'reset'})
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