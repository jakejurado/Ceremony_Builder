import React, {useContext} from 'react';
import { PopupContext } from "./PopupAccount";


function PopupLogin(){
  const {dispatch, inputDom} = useContext(PopupContext);

  function handleClick(){
    dispatch({type:'forgot'})
  }

  return(
    <div class="mainInput" ref={inputDom}>

      <div class = 'line'>
        <div class="desc">
          e-mail: 
        </div>
        <div class="inputDiv">
          <input class='inputContent' />
        </div>
      </div>
      
      <div class = 'line'>
        <div class="desc">
          password: 
        </div>
        <div class="inputDiv">
          <input class='inputContent' />
        </div>
      </div>
      
      <div class='lefty' onClick={handleClick}>forgot password? </div>
    </div>
  )
}

export default PopupLogin