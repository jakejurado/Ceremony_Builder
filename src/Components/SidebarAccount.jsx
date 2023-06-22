import React, {useContext} from 'react';
import { GlobalContext } from './App';

function SidebarAccount(){
  const {popupDispatch, dispatch, setTemplateTitle, setCurrUser, currUser} = useContext(GlobalContext);

  function handleLoginClick(){
    // setPopup('login')
    popupDispatch({type: 'myAuth', subAct: 'login'})
  }

  function handleSignupClick(){
    // setPopup('signup')
    popupDispatch({type: 'myAuth', subAct: 'signup'})
  }

  function handleAcctClick(){
    popupDispatch({type: 'myAuth', subAct: 'signout'});
  }

  function handleSignoutClick(){
    setCurrUser(null);
    dispatch({type: 'reset', payload: null})
  }

  return(
    <div className='sidebar-loginlogout'>
      {!currUser && 
        <ul className='sidebar-login-ul'>
          <li onClick={handleLoginClick}>login</li>
          <li>/</li>
          <li onClick={handleSignupClick}>signup</li>
        </ul>
      }

      {currUser && 
        <ul>
          <li onClick={handleAcctClick}>account</li>
          <li>/</li>
          <li onClick={handleSignoutClick}>signout</li>
        </ul>
      }

    </div>
  )
}

export default SidebarAccount;