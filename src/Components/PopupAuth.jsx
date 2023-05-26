import React, {useContext, createContext, useRef, useReducer, useEffect, useMemo, useState} from 'react'
import PopupAuthLogin from './PopupAuthLogin';
import PopupAuthSignup from './PopupAuthSignup';
import PopupAuthForgot from './PopupAuthForgot';
import PopupAuthVerify from './PopupAuthVerify';
import PopupAuthAcct from './PopupAuthAcct';
import PopupAuthReset from './PopupAuthReset';
import PopupAuthSignout from './PopupAuthSignout';
import PopupAuthDelete from './PopupAuthDelete';
import { GlobalContext} from "./App";
import { checkSubmitButtonCriteria, passwordMatch, passwordLength, validateEmail } from '../functions/account/password';
import {createDomToggle} from "../functions/account/domToggle";


//holds the context for the login/signup state
export const PopupContext = createContext(null);

function PopupAuth({subAct}){
  console.log('enter PopupAuth')
  
  //CONTEXT: global state
  const {setCurrUser, currUser, popupDispatch} = useContext(GlobalContext)

  //REFs
    //buttons
  const buttonDom = useRef(null); //submit button
  const handleSubmitClickRef = useRef(null); //submit click function
    //input boxes for user inputs
  const userEmailDom = useRef(null);
  const userCurrPassDom = useRef(null);
  const userCodeDom = useRef(null);
  const userNewPassDom1 = useRef(null);
  const userNewPassDom2 = useRef(null)

  //STATE
  // const [currentPopup, setCurrentPopup] = useState(<PopupAuthLogin />);
  //red text to help explain why submit button isn't active
  const [passwordCriteria, setPasswordCriteria] = useState({match: true, len: true});
  const [emailCriteria, setEmailCriteria] = useState(true);
  const [codeCriteria, setCodeCriteria] = useState(true);
  const [loginFail, setLoginFail ] = useState(false);
  const [signupFail, setSignupFail] = useState(false);

  //TOGGLE
  //creates the submit button toggle, so is hidden when criteria is not met.
  const submitToggle = new createDomToggle(buttonDom.current, handleSubmitClickRef.current, 'buttonActive' )

    //Loads popup corresponding with the subAct of popup state.
    let currentPopup;

    switch (subAct) {
      case "signup": 
        currentPopup = <PopupAuthSignup />;
        break;
      case "login":
        currentPopup = <PopupAuthLogin />;
        break;
      case 'forgot':
        currentPopup = <PopupAuthForgot />;
        break;
      case 'verify':
        currentPopup = <PopupAuthVerify />
        break;
      case 'signout':
        currentPopup = <PopupAuthSignout />;
        break;
      case 'delete':
        currentPopup = <PopupAuthDelete />;
        break
      case 'reset':
        console.log('reset')
        currentPopup = <PopupAuthReset />;
        break;
      case 'close':
        return null
      default:
        console.log('error')
    }


  //PAGE INIT
  //on load, sets the state for the current popup box and create handleSubmitClick
  useEffect(()=>{
    handleSubmitClickRef.current = handleSubmitClick;
  }, [])

  //toggles the submit button between inactive to active
  function toggleButtonActive(bool){
    console.log('****** ,', bool, submitToggle)
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
    setLoginFail(false)
    const res = checkSubmitButtonCriteria(userInfo);
    //set state according to if criteria is met
    toggleButtonActive(res);
  }

  //checks password input value to determine if submit button should be active
  function handleCurrPasswordInputChange(e){
    const userInfo = grabUserData()
    console.log({userInfo})
    const validPasswordLen = passwordLength(userInfo.passCurr);
    console.log(validPasswordLen)
    // const validPasswordMatch = passwordMatch(userInfo.passNew1, userInfo.passNew2);
    setPasswordCriteria({match: true, len: validPasswordLen})
    setLoginFail(false)

    //set state according to if criteria is met
    const res = checkSubmitButtonCriteria(userInfo);
    console.log('pretoggle')
    toggleButtonActive(res);
  }

  //checks password2 input value to determine if submit button should be active
  function handleNewPasswordInputChange1(e){
    const userInfo = grabUserData()
    console.log({userInfo})
    const validPasswordLen = passwordLength(userInfo.passNew1);
    const validPasswordMatch = passwordMatch(userInfo.passNew1, userInfo.passNew2);
    setPasswordCriteria({match: validPasswordMatch, len: validPasswordLen})
    //set state according to if criteria is met
    const res = checkSubmitButtonCriteria(userInfo);
    toggleButtonActive(res);
  }

  function handleNewPasswordInputChange2(e){
    const userInfo = grabUserData()
    console.log({userInfo}) 
    const validPasswordLen = passwordLength(userInfo.passNew2);
    const validPasswordMatch = passwordMatch(userInfo.passNew1, userInfo.passNew2);
    setPasswordCriteria({match: validPasswordMatch, len: validPasswordLen})
    //set state according to if criteria is met
    const res = checkSubmitButtonCriteria(userInfo);
    toggleButtonActive(res);
  }

  //checks code input value to determine if submit button should be active
  function handleCodeInputChange(e){
    const userInfo = grabUserData()
    setCodeCriteria(userInfo.code)
    console.log(userInfo.code)
    const res = checkSubmitButtonCriteria(userInfo);
    //set state according to if criteria is met
    toggleButtonActive(res);
  }

  //grabs the data from the input and places in object.
  function grabUserData(){
    const userInfo={};
    userInfo.title = subAct;
    userInfo.email = userEmailDom.current.value;
    userInfo.passCurr = userCurrPassDom.current?.value;
    userInfo.passNew1 = userNewPassDom1.current?.value;
    userInfo.passNew2 = userNewPassDom2.current?.value;
    userInfo.code = userCodeDom.current?.value;
    
    
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
        url = `user/login/?email=${userInfo.email}&password=${userInfo.passCurr}`;
        options.method = 'GET'
        break;
      }
      case ('signup'): {
        url = 'user/signup';
        options.method = 'POST'
        body.email = userInfo.email;
        body.password = userInfo.passNew1
        options.body = JSON.stringify(body);
        options.headers = {
          'Content-Type': 'application/json'
        };
        break;
      }
      case ('delete'): {
        url = `user/signup?userId=${currUser}?userPassword=${userInfo.passCurr}`
        options.method = 'DELETE';
        options.headers = {
          'Content-Type': 'application/json'
        };
        break;
      }
      case('reset'):{
        url = 'user/signup'
        options.method = 'PUT';
        body.userId = currUser;
        body.userEmail = userInfo.email;
        body.userPassword = userInfo.passCurr
        body.newPassword = userInfo.passNew1;
        options.body = JSON.stringify(body);
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
      if(data.userId) setCurrUser(data.userId);

    } catch (error) {
      // clear password and email fields
      userEmailDom.current.value = '';
      userCurrPassDom.current.value = '';
      if(subAct === 'signup') userNewPassDom1.current.value = '';

      
      if(subAct === 'login') setLoginFail(true);
      if(subAct === 'signup') setSignupFail(true);
    }
  }

  function handleSignupTabClick(){
    popupDispatch({type: 'myAuth', subAct: 'signup'})
  }

  function handleLoginTabClick(){
    popupDispatch({type: 'myAuth', subAct: 'login'})
  }

  function handleForgotClick(){
    popupDispatch({type:'myAuth', subAct:'forgot'})
  }

  function handleVerifyClick(){
    popupDispatch({type:'myAuth', subAct:'verify'})
  }

  return(
    <PopupContext.Provider value={{userCodeDom, userEmailDom, userNewPassDom1, userCurrPassDom, userNewPassDom2, handleEmailInputChange, handleCurrPasswordInputChange, handleNewPasswordInputChange1, handleNewPasswordInputChange2, handleCodeInputChange, passwordCriteria, emailCriteria, codeCriteria, loginFail, signupFail, buttonDom, popupDispatch, handleLoginTabClick, handleSignupTabClick, handleForgotClick, handleVerifyClick, setCurrUser}}>
        <div className = 'acctPopup'>
          {currentPopup}
        </div>
    </PopupContext.Provider>
  )
}


export default PopupAuth;