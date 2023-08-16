import React, {useState, useRef, useContext} from "react";
import { GlobalContext } from "./App";

function PopupAI_Prompt({subAct, changeStatus, changeAIresponse}){
  const {currTemplate} = useContext(GlobalContext)

  const lengthRef = useRef(null);
  const toneRef = useRef(null);

  const baseText = 'Please take the following text and edit it.  It is a wedding ceremony, so imagine you are a wedding officiant who is writing the script that will be spoken at the wedding.'

  const [script, setScript] = useState(currTemplate[subAct.varname].script[parseInt(subAct.cardIndex)])
  const [combinedPrompt, setCombinedPrompt] = useState(baseText)


    //handles the highlighting of the selected buttons
  function handleSelectorButtons(e){
    const currButton = e.target;
    const label = currButton.parentNode.dataset.type
    const allButtons = currButton.parentNode.children;

      //removes active button style
    [...allButtons].forEach(btn => {
      btn.classList.remove('btn-active');
    })
      //add active button style
    currButton.classList.add('btn-active')
    
      //update ref
    if(label === 'length'){
      lengthRef.current = currButton 
    } else{
      toneRef.current = currButton
    }

      //create the prompt and update state
    const length = lengthRef.current.dataset.value
    const tone = toneRef.current.dataset.value
    setCombinedPrompt(createAIprompt({length, tone, baseText }))
  }

    //fetch ai response
  function handleSubmitButton(){
    console.log(combinedPrompt + '\n\nHERE IT IS: \n\n' + script)
    // changeAIresponse
    changeStatus('loading');
  }

    //creates prompt from keywords
  function createAIprompt(obj){
    const {length, tone, baseText} = obj

    // let baseText = 'Please take the following text and edit it.  It is a wedding ceremony, so imagine you are a wedding officiant who is writing the script that will be spoken at the wedding.'
    let lengthPrompt = '';
    switch(length){
      case 'longer':
        lengthPrompt += ' I will need you to take the script and make it double in length.'
        break;
      case 'shorter':
        lengthPrompt += ' I will need you to take the script and make it shorter.  Condense it so it is half the length.'
        break;
      default:
    }

    let tonePrompt = '';
    switch(tone){
      case 'formal':
        tonePrompt += ' I will need you to take the script and change the tone to something more proper, official, and formal.'
        break;
      case 'informal':
        tonePrompt += ' I will need you to take the script and change the tone to something more informal, but not too casual.'
        break;
      default:
    }
    console.log(baseText + lengthPrompt + tonePrompt);
    return baseText + lengthPrompt + tonePrompt
  }

  return(
    <>
      <ul id='aiOptions'>
        <li className='aiChoices'>
          <label>Length</label>
          <div className='btn-group ai-length' data-type='length'>
            <button data-value="longer" class="radio-btn" onClick={handleSelectorButtons}>longer</button>
            <button data-value="shorter" class="radio-btn" onClick={handleSelectorButtons}>shorter</button>
            <button data-value="na" ref={lengthRef} class="btn-active radio-btn" onClick={handleSelectorButtons}>n/a</button>
          </div>
        </li>
        <li className='aiChoices'>
          <label>Tone</label>
          <div className='btn-group ai-tone' data-type='tone'>
            <button data-value="formal" class="radio-btn" onClick={handleSelectorButtons}>formal</button>
            <button data-value="informal" class="radio-btn" onClick={handleSelectorButtons}>informal</button>
            <button data-value="na" ref={toneRef} class="radio-btn btn-active" onClick={handleSelectorButtons}>n/a</button>
          </div>
        </li>
      </ul>
      <div id='aiScript'>
        <p>{combinedPrompt}</p>
        <p>HERE IS THE SCRIPT:</p>
        <p>{script}</p>
      </div>
      <button className='boxButton' onClick={handleSubmitButton}>Submit</button>

    </>
  )
}

export default PopupAI_Prompt
