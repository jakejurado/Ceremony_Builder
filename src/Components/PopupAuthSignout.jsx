import React, {useContext} from 'react';
import { PopupContext } from './PopupAuth'; 

  //signout component
function PopupAuthSignout(){
  const {dispatch, popupDispatch, setCurrUser, handleDeleteClick, handleResetClick} = useContext(PopupContext)
  
    //remove user, remove popup, and reset templates
  function handleSubmitClick(){
    setCurrUser(null);
    popupDispatch({box: null, subAct: null})
    dispatch({type: 'reset', payload: null})
  }

  return(
    <div className="entireBox">
      <div id='signOutTab' className="eachTab">Signout</div>
      <div id='passwordTab' className="eachTab selectedTab" onClick={handleResetClick} >Password</div>
      <div id='DeleteTab' className="eachTab selectedTab" onClick={handleDeleteClick} >Delete</div>

      <div className="mainInput">
        <div className="signoutBox">
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