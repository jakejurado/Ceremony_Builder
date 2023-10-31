import React, {useContext, createContext, useRef, useEffect, useState, useCallback} from 'react'
import PopupAuthLogin from './PopupAuthLogin';
import PopupAuthSignup from './PopupAuthSignup';
import PopupAuthForgot from './PopupAuthForgot';
import PopupAuthReset from './PopupAuthReset';
import PopupAuthSignout from './PopupAuthSignout';
import PopupAuthDelete from './PopupAuthDelete';
import { GlobalContext} from "./App";

  //holds the context for the login/signup state
export const PopupContext = createContext(null);

  //description: depending on currentPopup state, a specific popup (login, signup, reset password, delete account, signout) is displayed.  Those components functionality all come from this component.
function PopupAuth({subAct}){
  //CONTEXT: global state
  const {setCurrUser, currUser, dispatch, popupDispatch} = useContext(GlobalContext)

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
      currentPopup = <PopupAuthDelete />;
      break
    case 'reset':
      currentPopup = <PopupAuthReset />;
      break;
    case 'close':
      return null
    default:
      console.log('error')
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
    <PopupContext.Provider value={{popupDispatch, dispatch, setCurrUser, currUser, handleLoginTabClick, handleSignupTabClick, handleForgotClick, handleVerifyClick, handleDeleteClick, handleResetClick, handleSignoffClick}}>
        <div className = 'acctPopup'>
          {currentPopup}
        </div>
    </PopupContext.Provider>
  )
}

export default PopupAuth;