import React, { useContext, useState } from "react";
import { GlobalContext } from "./App";

  //saves the current templates to database
function SidebarSave() {
  const { dispatch, currUser } = useContext(GlobalContext);
  const [notifications, setNotifications] = useState(null);
  
    //directs user to login/signup if currUser is null; otherwise saves to database
  function handleClick() {
    if(!currUser){
      setNotifications('login or signup to save template')
    } else {
      setNotifications('template has been saved')
      dispatch({type: 'saveTemplateToDatabase', payload: {setState: setNotifications}} )
    }
    setTimeout(setNotifications, 9000);
  }

  return (
    <div className="sidebarElements">
      {/* <h2>SAVE</h2> */}
      <button className="boxButton" onClick={handleClick}>
        Save
      </button>
      <ul className='saveNotificataions'>
        {notifications}
      </ul>
    </div>
  );
}

export default SidebarSave;
