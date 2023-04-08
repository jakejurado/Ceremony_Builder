import React, {useContext} from 'react';
import { PopupContext } from './PopupAccount';

function PopupForgot(){
  const {dispatch, inputDom} = useContext(PopupContext);

  function handleClick(){
    console.log(dispatch)
    dispatch({type:'verify'})
  }

  return(
    <div className="mainInput" ref={inputDom}>

      <div className='lineInstructions'>
        Enter your email associated with your account and then submit.  You will be provided a code to change your password.
      </div>
      
      
      <div className='line'>
        <div className="desc">
          e-mail: 
        </div>
        <div className="inputDiv">
          <input className='inputContent' />
        </div>
      </div>
      
      <div className="lefty" onClick={handleClick}>I have the code</div>
    </div>
  )
}

export default PopupForgot