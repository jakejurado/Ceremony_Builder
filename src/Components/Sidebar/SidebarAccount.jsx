import React from 'react';
// import close  from '../../public/assets/close.png';
import { usePopup } from '../../hooks/usePopup';
import { useAuth } from '../../hooks/useAuth';
import { useScreen } from '../../hooks/useScreen';
import { useTemplates } from '../../hooks/useTemplates';

  //sidebar component that contains account info (login/logout/signup)
function SidebarAccount(){
  const { popupDispatch } = usePopup();
  const { currUser, setCurrUser } = useAuth();
  const { resetTemplates } = useTemplates();


  function handleLoginClick(){
    popupDispatch({type: 'myAuth', subAct: 'login'})
  }

  function handleSignupClick(){
    popupDispatch({type: 'myAuth', subAct: 'signup'})
  }

  function handleAcctClick(){
    popupDispatch({type: 'myAuth', subAct: 'signout'});
  }

  function handleSignoutClick(){
    setCurrUser(null);
    resetTemplates();
  }

  return(
    <div className='sidebar-loginlogout'>
    
      {/* {isMobile && <div className='cButton'><img src={close} alt='close button image' /></div>} */}
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