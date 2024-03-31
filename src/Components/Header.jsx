import React, { useState, useEffect, useContext } from 'react';
import cbImage from "../../public/assets/ceremonybuilderMain.png";
import cb2Image from "../../public/assets/ceremonybuilderTitle.png";
import { useScreen } from '../hooks/useScreen';

  //Holds the main website title image
function Header() {
  const { isMobile } = useScreen();

  const [isVisible, setIsVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const threshold = 200;

  const toggleVisibility = () => {
    const currentScrollPos = window.pageYOffset;
    if (Math.abs(currentScrollPos - scrollPosition) < threshold) {
      return;
    }

    if (scrollPosition < currentScrollPos && isVisible) {
      setIsVisible(false);
    } else if (scrollPosition > currentScrollPos && !isVisible) {
      setIsVisible(true);
    }

    setScrollPosition(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [isVisible, scrollPosition]);

  return (
    <div className="titleS">
      {isVisible &&(
        <img id="h1Image" src={isMobile? cb2Image : cbImage} alt="image of words Ceremony Builder" />
      )}

      {/* {isMobile && (
        <img id="h1Image" src={isMobile? cb2Image : cbImage} alt="image of words Ceremony Builder" />
      )}  */}
    </div>
  );
}

export default Header;
