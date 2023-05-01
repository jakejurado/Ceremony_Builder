import React, {useContext, createContext, useRef, useReducer, useEffect, useMemo, useState} from 'react'
import PopupForgot from './PopupForgot';
import PopupLogin from './PopupLogin';
import PopupSignup from './PopupSignup';
import PopupVerify from './PopupVerify';
import { GlobalContext} from "./App";
import { checkSubmitButtonCriteria, passwordMatch, passwordLength, validateEmail } from '../functions/account/password';
import {createDomToggle} from "../functions/account/domToggle";

//holds the context for the login/signup state
export const PopupContext = createContext(null);

function PopupAccount({curr}){
  
  //CONTEXT: global state
  const {setPopup} = useContext(GlobalContext)

  //REFs
  const buttonDom = useRef(null); //submit button
  const handleSubmitClickRef = useRef(null); //submit click function
  const loginTab = useRef(null)
  const signupTab = useRef(null)

  //input boxes for user inputs
  const userEmailDom = useRef(null);
  const userPassDom = useRef(null);
  const userCodeDom = useRef(null);
  const userNewPassDom = useRef(null);

  //STATE
  //red text to help explain why submit button isn't active
  const [passwordCriteria, setPasswordCriteria] = useState({match: true, len: true});
  const [emailCriteria, setEmailCriteria] = useState(true);
  const [codeCriteria, setCodeCriteria] = useState(true);
  const [credentialsFail, setCredentialsFail ] = useState(false);
  const [authFail, setAuthFail] = useState(false);

  //TOGGLE
  //creates the submit button toggle
  const submitToggle = new createDomToggle(buttonDom.current, handleSubmitClickRef.current, 'buttonActive' )

  //REDUCER
  //keeps track of which pop up box should be displayed
  const [popupBox, dispatch] = useReducer(reducer, {title: 'login', display: <PopupLogin />});

  //logic for the popupBox reducer
  function reducer(state, action){
    const { type } = action;

    //removes any event listeners that had been added.
    submitToggle.deactivate();

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
        return {title: 'login2', display: <PopupLogin />}
      case 'close':
        return null
      default:
        return {title: 'loginn', display: PopupLogin}
    }
  }

  //PAGE INIT
  //on load, sets the state for the current popup box and create handleSubmitClick
  useEffect(()=>{
    dispatch({type: curr}) //sets the popup from props
    handleSubmitClickRef.current = handleSubmitClick;
  }, [])

  //toggles the submit button between inactive to active
  function toggleButtonActive(bool){
    if(bool) {
      handleSubmitClickRef.current = handleSubmitClick;
      submitToggle.activate(handleSubmitClickRef.current);
    } else {
      submitToggle.deactivate();
    }
  }

  //checks email input value to determine if submit button should be active
  function handleEmailInputChange(e){
    const userInfo = grabUserData()
    const validEmail = validateEmail(userInfo.email);
    setEmailCriteria(validEmail);
    const res = checkSubmitButtonCriteria(userInfo);

    // const res = validEmail && validPasswordLen && validPasswordMatch;
    toggleButtonActive(res);
  }

  //checks password input value to determine if submit button should be active
  function handlePasswordInputChange1(e){
    const userInfo = grabUserData()
    const validPasswordLen = passwordLength(userInfo.pass1);
    const validPasswordMatch = passwordMatch(userInfo.pass1, userInfo.pass2);
    setPasswordCriteria({match: validPasswordMatch, len: validPasswordLen})

    const res = checkSubmitButtonCriteria(userInfo);
    toggleButtonActive(res);
  }

  //checks password2 input value to determine if submit button should be active
  function handlePasswordInputChange2(e){
    const userInfo = grabUserData()

    const validPasswordLen = passwordLength(userInfo.pass1);
    const validPasswordMatch = passwordMatch(userInfo.pass1, userInfo.pass2);
    setPasswordCriteria({match: validPasswordMatch, len: validPasswordLen})

    const res = checkSubmitButtonCriteria(userInfo);
    toggleButtonActive(res);
  }

  //checks code input value to determine if submit button should be active
  function handleCodeInputChange(e){
    const userInfo = grabUserData()
    
    setCodeCriteria(userInfo.code1)
    const res = checkSubmitButtonCriteria(userInfo);
    toggleButtonActive(res);
  }
  
  //connects with parent state that displays the popup and removes it.
  function handleBackgroundClick(){
    setPopup(null);
  }

  //grabs the data from the input and places in object.
  function grabUserData(){
    const userInfo={};
    userInfo.title = popupBox.title;
    userInfo.email = userEmailDom.current.value;
    userInfo.pass1 = userPassDom.current?.value;
    userInfo.pass2 = userNewPassDom.current?.value;
    userInfo.code1 = userCodeDom.current?.value;
    
    return userInfo
  }

  //grbs user data
  async function handleSubmitClick(){
    const userInfo = grabUserData();

    let url;
    let options = { method: ''};
    let body = {};

    switch (userInfo.title){
      case ('login'): {
        url = `user/login/?email=${userInfo.email}&password=${userInfo.pass1}`;
        options.method = 'GET'
        break;
      }
      case ('signup'): {
        url = 'user/signup';
        options.method = 'POST'
        body.email = userInfo.email;
        body.password = userInfo.pass1
        options.body = JSON.stringify(body);
        options.headers = {
          'Content-Type': 'application/json'
        };
        break;
      }
      default:
        console.log(error)
    }

    try{
      const response = await fetch(url, options);
      //handle bad response
      if (!response.ok) {
        throw new Error({
          message :'Network response was not ok',
          authentication: false,
        })
      }
      //receive the data
      const data = await response.json();
      console.log({data});

    } catch (error) {
      // clear password and email fields
      // display password or email may be incorrect
    }
  }


  return(
    <PopupContext.Provider value={{dispatch, userCodeDom, userEmailDom, userNewPassDom, userPassDom, handleEmailInputChange, handlePasswordInputChange1, handlePasswordInputChange2, handleCodeInputChange, passwordCriteria, emailCriteria, codeCriteria}}>
      <div id='popupContainer'>
        <div id='popupBackground' onClick={handleBackgroundClick}></div>
        <div className = 'acctPopup'>
          <div className="entireBox" >
            <div id='loginTab' ref={loginTab} className={`eachTab ${popupBox.title === 'login' ? "selectedTab" : "undefined"}`} onClick={()=>dispatch({type: 'login'})}>login</div>
            <div id='signupTab' ref={signupTab} className={`eachTab ${popupBox.title === 'signup' ? "selectedTab" : "undefined"}`} onClick={()=>dispatch({type: 'signup'})}>signup</div>
            {popupBox.display}
            <div className="bottomBox">
              <div className='submitButton' ref={buttonDom}>
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