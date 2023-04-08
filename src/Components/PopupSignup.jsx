import React, {useContext, useRef, useEffect, useState} from 'react';
import { PopupContext } from './PopupAccount';
import { passwordCriteria, validateEmail } from '../functions/account/password';

function PopupSignup(){
  const {inputDom, setSubmitReady, userEmailDom, userNewPassDom, userPassDom} = useContext(PopupContext)

  //state to hold the inputs from the user.
  const [emailInput, setEmailInput] = useState(false);
  const [passwordInput1, setPasswordInput1] = useState(null)
  const [passwordInput2, setPasswordInput2] = useState(null)
  
  //when the user enters in the input, we check if we have all the info needed to open submit button.
  useEffect(() => {
    let validEmail = validateEmail(emailInput)
    let validPassword = passwordCriteria(passwordInput1, passwordInput2)

    if(validEmail && validPassword){
      setSubmitReady(true);
      console.log('submit open')
    } else{
      setSubmitReady(false);
    }
  }, [emailInput, passwordInput1, passwordInput2])



  return(
    <div className="mainInput" ref={inputDom}>

      <div className = 'line'>
        <div className="desc">
          e-mail: 
        </div>
        <div className="inputDiv">
          <input ref={userEmailDom} className='inputContent' onChange={(e)=>setEmailInput(e.target.value)} />
        </div>
      </div>
      
      <div className = 'line'>
        <div className="desc">
          password: 
        </div>
        <div className="inputDiv">
          <input ref={userPassDom} className='inputContent' onChange={(e)=>setPasswordInput1(e.target.value)} />
        </div>
      </div>

      <div className = 'line moreMargin'>
        <div className="desc">
          password: 
        </div>
        <div className="inputDiv">
          <input ref={userNewPassDom} className='inputContent' onChange={(e)=>setPasswordInput2(e.target.value)} />
        </div>
      </div>

    </div>
  )
}

export default PopupSignup