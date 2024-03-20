import React, { useState } from "react";
import { useTemplates } from "../../hooks/useTemplates";
import { useAuth } from "../../hooks/useAuth";
import { saveTemplateToDatabase } from "../../functions/fetches/saveTemplateToDatabase";

  //saves the current templates to database
function SidebarSave() {
  const { metaData, setMetaData, templates } = useTemplates();
  const { currUser } = useAuth();
  const [notifications, setNotifications] = useState(null);
  
    //directs user to login/signup if currUser is null; otherwise saves to database
  function handleClick() {
    if(!currUser){
      setNotifications('login or signup to save template')
    } else {
      saveTemplateToDatabase(currUser, metaData, setMetaData, templates);
      setNotifications('template has been saved')
      // dispatch({type: 'saveTemplateToDatabase', payload: {setState: setNotifications}} )
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
