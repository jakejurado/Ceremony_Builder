import React, {useState, useRef, useContext, setContext} from "react";
import PopupAI_Prompt from "./PopupAI_Prompt";
import PopupAI_Loading from "./PopupAI_Loading";
import PopupAI_Results from "./PopupAI_Results";
import { GlobalContext } from "./App";


function PopupAI({subAct}){
  const {currTemplate} = useContext(GlobalContext)

  const [aiResponse, setAiResponse] = useState('here is the response')

    //status to know what part of the process we're in
  const [status, setStatus] = useState({prompt: true, loading: false, results: false})

    //changes the status
  function changeStatus(input){
    const res = {prompt: false, loading: false, results: false}
    res[input] = true
    setStatus(res)
    setTimeout(() =>{
      setStatus({prompt: false, loading: false, results: true})
    }, 2000)
  }

    //updates the aiResponse
  function changeAIresponse(input){
    setAiResponse(input)
  }

  return(
    <div id='aiBorder'>
      <h2>Writing Assistant</h2>
      {status.prompt && <PopupAI_Prompt subAct={subAct} changeStatus={changeStatus} changeAIresponse={changeAIresponse} />}
      {status.loading && <PopupAI_Loading />}
      {status.results && <PopupAI_Results subAct={subAct} aiResponse={aiResponse} />}
    </div>
  )
}

export default PopupAI
