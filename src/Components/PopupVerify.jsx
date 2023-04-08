import React, {useContext} from 'react';
import { PopupContext } from "./PopupAccount";

function PopupVerify(){
  const {dispatch, inputDom} = useContext(PopupContext);

  function handleClick(){
    dispatch({type:'forgot'})
  }


  return(
    <div class="mainInput" ref={inputDom}>

      <div className= 'line'>
        <div class="desc">
          email: 
        </div>
        <div class="inputDiv">
          <input class='inputContent' />
        </div>
      </div>

      <div className= 'line'>
        <div class="desc">
          verification code: 
        </div>
        <div class="inputDiv">
          <input class='inputContent' />
        </div>
      </div>
      
      <div className= 'line'>
        <div class="desc">
          new password: 
        </div>
        <div class="inputDiv">
          <input class='inputContent' />
        </div>
      </div>


      <div className= 'line depth'>
        <div class="desc">
          new password: 
        </div>
        <div class="inputDiv">
          <input class='inputContent'/>
        </div>
      </div>

      <div class="lefty" onClick={handleClick}>
        go back
      </div>
      
    </div>
  )
}

export default PopupVerify