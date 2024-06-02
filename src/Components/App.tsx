import React, { useEffect } from 'react';

//React Components
import AppMainDisplay from "./AppMainDisplay";
import Sidebar from "./Sidebar/Sidebar";
import Popup from './Popup/Popup';
import { useAuth } from '../hooks/useAuth';
import { useTemplates } from '../hooks/useTemplates';
import { usePopup } from '../hooks/usePopup';
import { useSidebar } from '../hooks/useSidebar';
import { useScreen } from '../hooks/useScreen';

//helperFunctions
import { fetchUserTemplates } from "../functions/fetches/fetchUserTemplates";
import { checkCookieForAccess } from "../functions/fetches/checkUserAccess"

  //Style import
import "../styles/main.scss";

function App() {
  const { checkScreenResize } = useScreen();
  const { coverRef } = useSidebar();
  const { currUser, setCurrUser} = useAuth();
  const { dispatch, metaData, setMetaData } = useTemplates();
  const { box, subAct } = usePopup();


    //initial load  
  useEffect(()=>{
      //check if the user has a cookie
    checkCookieForAccess(setCurrUser);

      //grab the screen size
    checkScreenResize();

      //add event listener to check for screen size change
    window.addEventListener('resize', checkScreenResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', checkScreenResize);
    };
  }, [])

    //fetch templates after user signs in.
  useEffect(() => {
    if(currUser){
      fetchUserTemplates(currUser, metaData, setMetaData, dispatch);
    }
  }, [currUser])


    
  return (
    <div className="AppContainer">
      <div ref={coverRef} id='whiteCover'></div>
      {box &&  <Popup box={box} subAct={subAct}/> }
      <Sidebar />
      <AppMainDisplay />
    </div>
  );
}

export default App;
