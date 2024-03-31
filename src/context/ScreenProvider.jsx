import React, {createContext, useState} from 'react';

export const ScreenContext = createContext(null);

export const ScreenProvider = ({ children }) => {
  const maxMobileSize = 800;
  const [isMobile, setIsMobile] = useState(window.innerWidth < maxMobileSize);

  const checkScreenResize = () => {
    if (window.innerWidth < maxMobileSize) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  return (
    <ScreenContext.Provider value={{isMobile, setIsMobile, checkScreenResize}}>
      {children}
    </ScreenContext.Provider>
  )
}