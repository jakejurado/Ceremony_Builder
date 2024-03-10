import React, { useState, useEffect } from "react";

function PopupAILoading() {
  const quotes = [
    "Wonderful things happen for those who sit and wait patiently for AI to think -ai",
    "The AI is studying your credit activity to write a better script",
    "Wait while AI is scraping the deep web for your most embarrassing moments",
    "AI can now feel love and is too emotional to write faster",
  ];

  const [count, setCount] = useState(0);

  useEffect(() => {
    let timeout;
    if(count === quotes.length - 1){
      timeout = setTimeout(() => {
        setCount(0);
      }, 2500);
    } else {
      timeout = setTimeout(() => {
        setCount(count + 1);
      }, 2500);
    }
    return () => clearTimeout(timeout);
  }, [count]);

  return (
    <div>
      <p>{quotes[count]}</p>
    </div>
  )
}

export default PopupAILoading;