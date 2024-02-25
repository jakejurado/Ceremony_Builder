import React, { useContext, useState, useCallback } from 'react'
import { GlobalContext } from './App'
import PopupAISubmitScreen from './PopupAISubmitScreen'
import PopupAIResultsScreen from './PopupAIResultsScreen'
import PopupAILoading from './PopupAILoading'


function PopupAI({ subAct }) {
  const { popupDispatch, dispatch} = useContext(GlobalContext)
  const { dataVarname, dataIndex, dataCardContent, dataCardIndex } = subAct

  const [prompt, setPrompt] = useState('');
  const [results, setResuts] = useState('who gives???');
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  
  function submitPromt(input){
    setPrompt(input);
    setHasSubmitted(true);
    setLoading(true);
    setTimeout(()=>{setLoading(false)}, 1000)
    //send prompt to api
  }

  function fetchPrompt(){
    //send request.
    //grab response and update results.
    //set loading to false
  }

  function saveAIResults(){
    //update the current template with the words
    const type = 'updateWords'
    const payload = {
      textContent: results,
      sectionName: dataVarname,
      cardIndex: Number(dataCardIndex)
    }
    dispatch({type, payload})
    handleBackgroundClick();
  }

  const handleBackgroundClick = useCallback(() =>{
    popupDispatch({type: null, box: null});
  }, [])


  return (
    <div id='aiCover'>
      <div id='aiInnerBox'>
        {!hasSubmitted && (
          <PopupAISubmitScreen 
            cardContent={dataCardContent}
            submitPromt={submitPromt}
            cancelPopup={handleBackgroundClick}
          />
        )}
        
        {hasSubmitted && loading && <PopupAILoading /> }
        
        {hasSubmitted && !loading && (
          <PopupAIResultsScreen 
            aiResults={results}
            saveAIResults={saveAIResults}
            cardContent={dataCardContent}
            cancelPopup={handleBackgroundClick}
            submitPromt={submitPromt}
            prompt={prompt}
          /> 
        )}
      </div>
    </div>
  )
}

export default PopupAI