import React, {useContext, createContext, useRef, useReducer, useEffect, useState} from 'react'
import PopupForgot from './PopupForgot';
import PopupLogin from './PopupLogin';
import PopupSignup from './PopupSignup';
import PopupVerify from './PopupVerify';
import { GlobalContext} from "./App";

//holds the context for the login/signup state
export const PopupContext = createContext(null);

function PopupAccount({curr}){
  const {setPopup} = useContext(GlobalContext)
  //keeps track of submit button should be active or not. 
  const [submitReady, setSubmitReady] = useState(false)
  //references
  const inputDom = useRef(null);
  const buttonDom = useRef(null);
  const handleSubmitClickRef = useRef(null);

  //user info
  const userEmailDom = useRef(null);
  const userPassDom = useRef(null);
  const userCodeDom = useRef(null);
  const userNewPassDom = useRef(null);

  //keeps track of which pop up box should be displayed.
  const [popupBox, dispatch] = useReducer(reducer, {title: 'login', display: <PopupLogin />});

  //logic for the popupBox
  function reducer(state, action){
    console.log('entered reducer')
    const { type } = action;

    switch (type) {
      case "signup": 
        return {title: 'signup', display: <PopupSignup />}
      case "login":
        return {title: 'login', display: <PopupLogin />}
      case 'forgot':
        return {title: 'forgot', display: <PopupForgot />}
      case 'verify':
        return {title: 'verify', display: <PopupVerify />}
      case 'initialLoad':
        console.log('entered initialLoad')
        return {title: 'login', display: <PopupLogin />}
      case 'close':
        return null
      default:
        console.log('default')
        return {title: 'login', display: PopupLogin}
    }
  }

  //on load, sets the state for the current popup box
  useEffect(()=>{
    dispatch({type: curr})
  }, [])

  //depending on the 'submitReady' the submit button becomes activated or dectivated
  useEffect(() => {
    //adds and removes style for the submit button
    buttonDom.current.classList.toggle('buttonVoid');

    //saves the reference to the onclick function
    handleSubmitClickRef.current = handleSubmitClick;
    
    if(submitReady){
      buttonDom.current.addEventListener("click", handleSubmitClickRef.current);
    } else{
      console.log('entered else')
      buttonDom.current.removeEventListener("click", handleSubmitClickRef.current);
    }

    //remove event listener
    return ()=>{
      buttonDom.current.removeEventListener("click", handleSubmitClickRef.current);
    }
  }, [submitReady])


  //connects with state that displays the popup and removes it.
  function handleBackgroundClick(){
    setPopup(null);
  }

  //grabs the data from the input and places in object.
  function handleSubmitClick(){
    const userInfo={};
    userInfo.title = popupBox.title;
    userInfo.email = userEmailDom.current.value;
    userInfo.password = userPassDom?.current.value;
    userInfo.code = userCodeDom.current?.value;
    userInfo.userNewPassDom = userCodeDom.current?.value;

    console.log(userInfo)
  }

  return(
    <PopupContext.Provider value={{dispatch, inputDom, setSubmitReady, userCodeDom, userEmailDom, userNewPassDom, userPassDom}}>
      <div id='popupContainer'>
        <div id='popupBackground' onClick={handleBackgroundClick}></div>
        <div className = 'acctPopup'>
          <div className="entireBox" >
            <div className='eachTab' onClick={()=>dispatch({type: 'login'})}>login</div>
            <div className='eachTab' onClick={()=>dispatch({type: 'signup'})}>signup</div>
            {popupBox.display}
            <div className="bottomBox">
              <div class='submitButton' ref={buttonDom}>
                Submit
              </div>
            </div>

          
          </div>

        </div>
      </div>
    </PopupContext.Provider>
  )
}


export default PopupAccount;