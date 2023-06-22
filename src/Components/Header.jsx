// import React from "react";
// import cbImage from "../../public/assets/ceremonybuilder.png";

// function Header() {
//   return (
//     <div className="titleS">
//       <img id="h1Image" src={cbImage} alt="image of words Ceremony Builder" />
//     </div>
//   );
// }

// export default Header;

import React, { useState, useEffect } from 'react';
import cbImage from "../../public/assets/ceremonybuilder.png";

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const threshold = 100;

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
      {isVisible && (
        <img id="h1Image" src={cbImage} alt="image of words Ceremony Builder" />
      )}
    </div>
  );
}

export default Header;
