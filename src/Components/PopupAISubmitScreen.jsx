import React from "react";

//909135

function PopupAISubmitScreen({cardContent}){
  return(
    <>

      <div id='aiTextBoxDiv'>
        <p>{cardContent}</p>
      </div>

      <div id='aiOptions'>

        <div class="aiOption">
          <h3>Length</h3>
          <div class="aiOptionButtons length-btn-group">
            <input type="radio" id="shorter" name="length" value="Shorter" class="hidden-radio"/>
            <label class="option-btn" for="shorter">Shorter</label>

            <input type="radio" id="reword-length" name="length" value="Rephrase" class="hidden-radio"/>
            <label class="option-btn" for="reword-length">Rephrase</label>

            <input type="radio" id="longer" name="length" value="Longer" class="hidden-radio"/>
            <label class="option-btn" for="longer">Longer</label>
          </div>
        </div>

        <div class="aiOption">
          <h3>Tone</h3>
          <div class="aiOptionButtons tone-btn-group">
            <input type="radio" id="informal" name="tone" value="Informal" class="hidden-radio"/>
            <label class="option-btn" for="informal">Informal</label>

            <input type="radio" id="same-tone" name="tone" value="Same" class="hidden-radio"/>
            <label class="option-btn" for="same-tone">Same</label>

            <input type="radio" id="formal" name="tone" value="Formal" class="hidden-radio"/>
            <label class="option-btn" for="formal">Formal</label>
          </div>
        </div>


      </div>

      <div id='aiButtons'>
        <button>Submit</button>
        <button>Cancel</button>
      </div>

    </>
  )
}

export default PopupAISubmitScreen