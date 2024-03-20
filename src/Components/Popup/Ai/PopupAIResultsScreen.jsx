import React, {useState} from "react";

function PopupAIResultsScreen({
  aiResults, 
  saveAIResults, 
  cardContent,
  closePopup,
  submitPromt,
  prompt,
}){

  const [showResults, setShowResults] = useState(true);
  const resultSwap = 'see original wording'
  const originalSwap = 'see ai wording'
  const [isResent, setIsResent] = useState(false);

  function handleSwap(){
    setShowResults(!showResults)
  }
  
  function handleTryAgain(){
    if(!isResent){
      const newPrompt = "I'm sending this prompt again, because the first response was not good: " + prompt;
      submitPromt(newPrompt)
      setIsResent(true);
    } else{
      submitPromt(prompt)
    }
  }




  return(
    <>
      <div id='aiTextBoxDiv'>
        {showResults ? aiResults: cardContent}
      </div>

      <div id='aiSwapContent' >
        <button onClick={handleSwap}>
          {showResults ? resultSwap : originalSwap}
        </button>
      </div>

      <div id='aiButtons'>
        <button onClick={saveAIResults}>Accept</button>
        <button onClick={closePopup}>Reject</button>
        <button onClick={handleTryAgain}>Try Again</button>
      </div>
    </>
  )
}

export default PopupAIResultsScreen