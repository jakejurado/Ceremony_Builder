import React, {useContext, createContext, useRef, useEffect, useState, useCallback} from 'react'
import PopupAuthLogin from './PopupAuthLogin';
import PopupAuthSignup from './PopupAuthSignup';
import PopupAuthForgot from './PopupAuthForgot';
import PopupAuthReset from './PopupAuthReset';
import PopupAuthSignout from './PopupAuthSignout';
import PopupAuthDelete from './PopupAuthDelete';
import { useAuth } from '../../../hooks/useAuth';
import { usePopup } from '../../../hooks/usePopup';
import { useTemplates } from '../../../hooks/useTemplates';

  //holds the context for the login/signup state
export const PopupAuthContext = createContext(null);

  //description: depending on currentPopup state, a specific popup (login, signup, reset password, delete account, signout) is displayed.  Those components functionality all come from this component.
function PopupAuth({subAct}){
  const { setCurrUser, currUser } = useAuth();
  const { dispatch } = useTemplates();
  const { popupDispatch } = usePopup();

    //Loads popup corresponding with the subAct of popup state.
  let currentPopup;

  switch (subAct) {
    case "signup": 
      currentPopup = <PopupAuthSignup />;
      break;
    case "login":
      currentPopup = <PopupAuthLogin />;
      break;
    case 'forgot':
      currentPopup = <PopupAuthForgot />;
      break;
    case 'signout':
      currentPopup = <PopupAuthSignout />;
      break;
    case 'delete':
      currentPopup = <PopupAuthDelete handleSignoffClick={handleSignoffClick} handleResetClick={handleResetClick} />;
      break
    case 'reset':
      currentPopup = <PopupAuthReset />;
      break;
    case 'close':
      return null
    default:
      console.error('error')
  }
  
  const handleSignupTabClick = useCallback(() => {
    popupDispatch({type: 'myAuth', subAct: 'signup'})
  }, [])

  const handleLoginTabClick = useCallback(() => {
    popupDispatch({type: 'myAuth', subAct: 'login'})
  }, [])

  const handleForgotClick = useCallback(() => {
    popupDispatch({type:'myAuth', subAct:'forgot'})
  }, [])

  const handleVerifyClick = useCallback(() => {
    popupDispatch({type:'myAuth', subAct:'verify'})
  }, [])

  const handleDeleteClick = useCallback(() => {
    popupDispatch({type: 'myAuth', subAct: 'delete'})
  }, [])

  const handleResetClick = useCallback(() => {
    popupDispatch({type: 'myAuth', subAct: 'reset'})
  }, [])

  const handleSignoffClick = useCallback(() => {
    popupDispatch({type:'myAuth', subAct: 'signout'})
  }, [])

  return(
    <PopupAuthContext.Provider value={{popupDispatch, dispatch, setCurrUser, currUser, handleLoginTabClick, handleSignupTabClick, handleForgotClick, handleVerifyClick, handleDeleteClick, handleResetClick, handleSignoffClick}}>
        <div className = 'acctPopup'>
          {currentPopup}
        </div>
    </PopupAuthContext.Provider>
  )
}

export default PopupAuth;