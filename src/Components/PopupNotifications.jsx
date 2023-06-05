import React, {useContext} from 'react';
import { PopupContext } from './PopupAuth';


function PopupNotifications(){
  const {emailCriteria, passwordCriteria, codeCriteria, loginFail, success } = useContext(PopupContext)

  return(
    <>
      <ul id='incompleteNotifications'>
        {!emailCriteria && <li id='incompleteEmailNotification' className='incomplete'>incomplete email address</li> }
        {!passwordCriteria.len && <li id='incompletePasswordNotification' className='incomplete'>password is too short</li> }
        {!passwordCriteria.match && <li id='noMatchPasswordNotification' className='incomplete'>passwords do not match</li> }
        {!codeCriteria && <li id='noMatchPasswordNotification' className='incomplete'>passwords do not match</li> }
        {loginFail && <li id='loginfail' className='incomplete'>incorrect email or password</li>}
        {success && <li id='success' className='complete'>success</li>}
      </ul>
    </>
  )
}

export default PopupNotifications;