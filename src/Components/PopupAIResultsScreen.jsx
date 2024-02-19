import React from "react";

function PopupAIResultsScreen({cardContent}){
  return(
    <>
      <div id='aiSwapContent'>
        <button>swap</button>
      </div>
      <div id='aiTextBoxDiv'>
        {cardContent}
      </div>

      <div id='aiButtons'>
        <button>Accept</button>
        <button>Reject</button>
        <button>Try Again</button>
      </div>
    </>
  )
}

export default PopupAIResultsScreen