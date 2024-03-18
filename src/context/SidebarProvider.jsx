import React, { createContext, useState, useRef, useEffect } from 'react';
import { openSidebarEffects, closeSidebarEffects } from '../functions/mainPage/sidebarFuncs';

export const SidebarContext = createContext(null);

export const SidebarProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const coverRef = useRef(null);

  useEffect(()=>{  
    //changes the css of the dom and adds/removes event listeners
  if(sidebar){
    openSidebarEffects(sidebarRef, coverRef, closeSidebar);
  } else{
    closeSidebarEffects(sidebarRef, coverRef, openSidebar);
  }

}, [sidebar, setSidebar])

  function closeSidebar(){
    setSidebar(false);
  }

  function openSidebar(){
    setSidebar(true);
  }



return (
    <SidebarContext.Provider value={{sidebar, closeSidebar, openSidebar, sidebarRef, coverRef}}>
      {children}
    </SidebarContext.Provider>
  )
}