import React, {useContext} from 'react';
import { PopupContext } from './PopupAccount';

function PopupForgot(){
  const {dispatch, inputDom} = useContext(PopupContext);

  function handleClick(){
    console.log(dispatch)
    dispatch({type:'verify'})
  }

  return(
    <div class="mainInput" ref={inputDom}>

      <div class='lineInstructions'>
        Enter your email associated with your account and then submit.  You will be provided a code to change your password.
      </div>
      
      
      <div class='line'>
        <div class="desc">
          e-mail: 
        </div>
        <div class="inputDiv">
          <input class='inputContent' />
        </div>
      </div>
      
      <div class="lefty" onClick={handleClick}>I have the code</div>
    </div>
  )
}

export default PopupForgot