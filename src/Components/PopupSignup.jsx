import React, {useContext} from 'react';
import { PopupContext } from './PopupAccount';

function PopupSignup(){
  const {inputDom} = useContext(PopupContext)
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


      <div class = 'line moreMargin'>
        <div class="desc">
          password: 
        </div>
        <div class="inputDiv">
          <input class='inputContent' />
        </div>
      </div>
    </div>
  )
}

export default PopupSignup