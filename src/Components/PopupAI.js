import React, { useContext, useState, useCallback } from 'react'
import PopupAISubmitScreen from './PopupAISubmitScreen'
import PopupAIResultsScreen from './PopupAIResultsScreen'
import PopupAILoading from './PopupAILoading'
import PopupAIError from './PopupAIError'
import { fetchCall } from '../functions/fetches/api'
import { usePopup } from '../hooks/usePopup'
import { useTemplates } from '../hooks/useTemplates'

function PopupAI({ subAct }) {
  const { popupDispatch } = usePopup()
  const { templateTitle, dispatch, user, metaData } = useTemplates();
  const { dataVarname, dataIndex, dataCardContent, dataCardIndex } = subAct
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);


  function getTemplateNumber(metaData, templateTitle){ 
    const metaD = metaData.get(templateTitle);
    return metaD.number
  }

  function submitPromt(input){
    setPrompt(input);
    setHasSubmitted(true);
    setLoading(true);
    fetchPrompt(input);
  }

  async function fetchPrompt(input){
    const body = {input, user, templateId: getTemplateNumber(metaData, templateTitle)}
    const data = await fetchCall.post('writer', body);
    try{
      if(data.error){
        setError(data.error);
      } else if(data.ok) {
        setResults(data.ok.message.content)
        setLoading(false);
      }
    }catch(err){
      setError('There was an error connecting with the AI.  If the problem persist, please contact admin with this error message: ' + err);
      setLoading(false);
    }
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
    closePopup();
  }


  if(error){
    return (
      <div id='aiCover'>
        <div id='aiInnerBox'>
          <PopupAIError error={error} />
        </div>
      </div>
    )
  }

  return (
    <div id='aiCover'>
      <div id='aiInnerBox'>
        {!hasSubmitted && (
          <PopupAISubmitScreen 
            cardContent={dataCardContent}
            submitPromt={submitPromt}
            closePopup={closePopup}
          />
        )}
        
        {hasSubmitted && loading && <PopupAILoading /> }
        
        {hasSubmitted && !loading && (
          <PopupAIResultsScreen 
            aiResults={results}
            saveAIResults={saveAIResults}
            cardContent={dataCardContent}
            closePopup={closePopup}
            submitPromt={submitPromt}
            prompt={prompt}
          /> 
        )}
      </div>
    </div>
  )
}

export default PopupAI