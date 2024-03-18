import React, {useContext} from 'react';
import { PopupAuthContext } from './PopupAuth'; 
import { usePopup } from '../hooks/usePopup';
import { useTemplates } from '../hooks/useTemplates';
import { useAuth } from '../hooks/useAuth';

  //signout component
function PopupAuthSignout(){
  const {handleDeleteClick, handleResetClick} = useContext(PopupAuthContext);
  const {dispatch} = useTemplates();
  const {closePopup} = usePopup();
  const {setCurrUser} = useAuth();
  
    //remove user, remove popup, and reset templates
  function handleSubmitClick(){
    setCurrUser(null);
    closePopup()
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