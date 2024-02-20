import React, {useContext, useCallback} from "react";
import { GlobalContext} from "./App";


function PopupAISubmitScreen({cardContent}){
  const {popupDispatch} = useContext(GlobalContext)

  //connects with parent state that displays the popup and removes it.
  const handleBackgroundClick = useCallback(() =>{
    popupDispatch({type: null, box: null});
  }, [])

  return(
    <>

      <div id='aiTextBoxDiv'>
        <p>{cardContent}</p>
      </div>

      <div id='aiInstructions'>
        <p><i>Choose the options for the AI to edit the content</i></p>
      </div>

      <div id='aiOptions'>

        <div className="aiOption">
          <h3>Length</h3>
          <div className="aiOptionButtons length-btn-group">
            <input type="radio" id="shorter" name="length" value="Shorter" class="hidden-radio"/>
            <label className="option-btn" htmlFor="shorter">Shorter</label>

            <input type="radio" id="reword-length" name="length" value="Rephrase" class="hidden-radio"/>
            <label className="option-btn" htmlFor="reword-length">Rephrase</label>

            <input type="radio" id="longer" name="length" value="Longer" class="hidden-radio"/>
            <label className="option-btn" htmlFor="longer">Longer</label>
          </div>
        </div>

        <div className="aiOption">
          <h3>Tone</h3>
          <div className="aiOptionButtons tone-btn-group">
            <input type="radio" id="informal" name="tone" value="Informal" class="hidden-radio"/>
            <label className="option-btn" htmlFor="informal">Informal</label>

            <input type="radio" id="same-tone" name="tone" value="Same" class="hidden-radio"/>
            <label className="option-btn" htmlFor="same-tone">Same</label>

            <input type="radio" id="formal" name="tone" value="Formal" class="hidden-radio"/>
            <label className="option-btn" htmlFor="formal">Formal</label>
          </div>
        </div>

      </div>

      <div id='aiButtons'>
        <button>Submit</button>
        <button onClick={handleBackgroundClick}>Cancel</button>
      </div>

    </>
  )
}

export default PopupAISubmitScreen