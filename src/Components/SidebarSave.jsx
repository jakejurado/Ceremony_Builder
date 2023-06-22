import React, { useContext, useState, useReducer } from "react";
import { GlobalContext } from "./App";

function SidebarSave() {
  const { dispatch, currUser } = useContext(GlobalContext);
  const [notifications, setNotifications] = useState(null);
  
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
