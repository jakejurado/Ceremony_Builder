import React, {useState} from "react";


function PopupAISubmitScreen({cardContent, submitPromt, cancelPopup}){
  const [length, setLength] = useState('');
  const [tone, setTone] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submit action
    const prompt = buildPrompt(cardContent, length, tone);
    submitPromt(prompt)
  };

  function buildPrompt(cardContent, lengthInput, toneInput){
    const contentStart = "Pretend you are a wedding officiant and you are writing a wedding ceremony for a couple.  I will provide you with an exert that is only part of the ceremony.  I just want you to edit this part of the ceremony.  Please take the following text and do the following to it: ";
    const toneChange = `change the tone of the wording to be more ${toneInput}. `;
    const lengthChange = `rewrite the content to change the length of the exert so that it is ${lengthInput === 'Longer' ? 'double' : 'half of'} its original length. `
    const reworded = "the same length, but rephrased and reworded. "

    const tone = toneInput ? toneChange : '';
    const length = lengthInput ? lengthChange : reworded;

    return contentStart + tone + length + 'Here is the exert: ' + cardContent
  }


  return(
    <>

      <div id='aiTextBoxDiv'>
        <p>{cardContent}</p>
      </div>

      <div id='aiInstructions'>
        <p><i>Choose the options for the AI to edit the content</i></p>
      </div>

      <div id='aiFormOptions'>
        <form onSubmit={handleSubmit} className='formClass'>
          <div id='aiOptions'>
            <div className="aiOption">
              <h3>Length</h3>
              <div className="aiOptionButtons length-btn-group">
                <input type="radio" id="shorter" name="length" value="Shorter" className="hidden-radio" onChange={() => setLength('Shorter')} />
                <label className="option-btn" htmlFor="shorter">Shorter</label>

                <input type="radio" id="reword-length" name="length" value="Rephrase" className="hidden-radio" onChange={() => setLength('Rephrase')} />
                <label className="option-btn" htmlFor="reword-length">Rephrase</label>

                <input type="radio" id="longer" name="length" value="Longer" className="hidden-radio" onChange={() => setLength('Longer')} />
                <label className="option-btn" htmlFor="longer">Longer</label>
              </div>
            </div>

            <div className="aiOption">
              <h3>Tone</h3>
              <div className="aiOptionButtons tone-btn-group">
                <input type="radio" id="informal" name="tone" value="Informal" className="hidden-radio" onChange={() => setTone('Informal')} />
                <label className="option-btn" htmlFor="informal">Informal</label>

                <input type="radio" id="same-tone" name="tone" value="Same" className="hidden-radio" onChange={() => setTone('Same')} />
                <label className="option-btn" htmlFor="same-tone">Same</label>

                <input type="radio" id="formal" name="tone" value="Formal" className="hidden-radio" onChange={() => setTone('Formal')} />
                <label className="option-btn" htmlFor="formal">Formal</label>
              </div>
            </div>

          </div>
        </form>
      </div>

      <div id='aiButtons'>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={cancelPopup}>Cancel</button>
      </div>

    </>
  )
}

export default PopupAISubmitScreen