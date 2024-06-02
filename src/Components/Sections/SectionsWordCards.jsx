import React, { useState, useEffect } from "react";
import { enterNames } from "../../functions/sections/names";
import { useTemplates } from "../../hooks/useTemplates";
import { useScreen } from "../../hooks/useScreen";

function SectionsWordCards({ cardContent, cardIndex, cardDivRef, saveContent, handleCardDisplay }) {
  const { names } = useTemplates();
  const { isMobile } = useScreen();

  const [textValue, setTextValue] = useState(enterNames(names, cardContent));

  useEffect(() => {
    setTextValue(enterNames(names, cardContent));
  }, [cardContent, names]);

  const handleChange = (e) => {
    setTextValue(e.target.value);
  };

  const expandCardMobile = () => {
    if (isMobile) {
      handleCardDisplay(cardIndex);
    }
  };

  return (
    <textarea
      ref={cardDivRef}
      className='cards'
      onClick={expandCardMobile}
      onBlur={saveContent}
      value={textValue}
      onChange={handleChange}
    >
    </textarea>
  );
}

export default SectionsWordCards;
