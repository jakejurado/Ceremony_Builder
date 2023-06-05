import React, {useContext, createContext, useRef, useEffect, useState} from 'react'
import PopupAuthLogin from './PopupAuthLogin';
import PopupAuthSignup from './PopupAuthSignup';
import PopupAuthForgot from './PopupAuthForgot';
import PopupAuthVerify from './PopupAuthVerify';
import PopupAuthReset from './PopupAuthReset';
import PopupAuthSignout from './PopupAuthSignout';
import PopupAuthDelete from './PopupAuthDelete';
import { GlobalContext} from "./App";
import { checkSubmitButtonCriteria, passwordMatch, passwordLength, validateEmail } from '../functions/account/password';
import {createDomToggle} from "../functions/account/domToggle";

//holds the context for the login/signup state
export const PopupContext = createContext(null);

  //description: depending on currentPopup state, a specific popup (login, signup, reset password) is displayed.  Those components functionality all come from this component.
function PopupAuth({subAct}){
  //CONTEXT: global state
  const {setCurrUser, currUser, popupDispatch} = useContext(GlobalContext)

  //REFs
  const buttonDom = useRef(null); //submit button in child component
  const handleSubmitClickRef = useRef(null); //submit click function in child component
    //input boxes for user inputs
  const userEmailDom = useRef(null);
  const userCurrPassDom = useRef(null);
  const userCodeDom = useRef(null);
  const userNewPassDom1 = useRef(null);
  const userNewPassDom2 = useRef(null)

  //STATE
    //red text to help explain why submit button isn't active
  const [passwordCriteria, setPasswordCriteria] = useState({match: true, len: true});
  const [emailCriteria, setEmailCriteria] = useState(true);
  const [codeCriteria, setCodeCriteria] = useState(true);
  const [loginFail, setLoginFail ] = useState(false);
  const [signupFail, setSignupFail] = useState(false);
  const [success, setSuccess] = useState(false);

    //true if above criteria is met for user to submit button
  const [isButtonActive, setIsButtonActive] = useState(false);

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
    //grabs the submit button and the handleSubmitClick button in the child component and creates a class instance that activates/deactivates button functionality.
  useEffect(()=>{
      //methods for adding/removing event listeners and styles to dom.
    const buttonFunctionality = new createDomToggle(
      buttonDom.current,
      handleSubmitClickRef.current,
      'buttonActive'
      );
      //check to add or remove button functionality
    buttonFunctionality.toggle(isButtonActive);
    
      //remove event listener when component dismounts
    return () => {
      buttonFunctionality.deactivate();
      }
  }, [isButtonActive, handleSubmitClickRef.current, buttonDom.current])

  //checks email input value to determine if submit button should be active
  function handleEmailInputChange(e){
      //update the emailCriteria state if email criteria is met
    const userInfo = grabUserData()
    const validEmail = validateEmail(grabUserData().email);
    setEmailCriteria(validEmail);
      //update the isButtonActive state if all conditions are met
    const res = checkSubmitButtonCriteria(userInfo);
    setIsButtonActive(res)
      //reset login state
    setLoginFail(false)
    setSuccess(false)
  }

    //checks password input value to determine if submit button should be active
  function handleCurrPasswordInputChange(e){
      //update passwordCriteria state if password criteria is met
    const userInfo = grabUserData()
    const validPasswordLen = passwordLength(userInfo.passCurr);
    setPasswordCriteria({match: true, len: validPasswordLen})
      //update the isButtonActive state if all conditions are met
    const res = checkSubmitButtonCriteria(userInfo);
    setIsButtonActive(res)
      //reset login state
    setLoginFail(false)
  }

  //checks password2 input value to determine if submit button should be active
  function handleNewPasswordInputChange1(e){
      //update newPasswordCriteria state if password criteria is met
    const userInfo = grabUserData()
    const validPasswordLen = passwordLength(userInfo.passNew1);
    const validPasswordMatch = passwordMatch(userInfo.passNew1, userInfo.passNew2);
    setPasswordCriteria({match: validPasswordMatch, len: validPasswordLen})
      //update the isButtonActive state if all conditions are met
    const res = checkSubmitButtonCriteria(userInfo);
    setIsButtonActive(res)
  }

  function handleNewPasswordInputChange2(e){
      //update newPasswordCriteria2 state if password criteria is met
    const userInfo = grabUserData()
    const validPasswordLen = passwordLength(userInfo.passNew2);
    const validPasswordMatch = passwordMatch(userInfo.passNew1, userInfo.passNew2);
    setPasswordCriteria({match: validPasswordMatch, len: validPasswordLen})
      //update the isButtonActive state if all conditions are met
    const res = checkSubmitButtonCriteria(userInfo);
    setIsButtonActive(res)
  }

  //checks code input value to determine if submit button should be active
  function handleCodeInputChange(e){
      //update codeCriteria state if password criteria is met
    const userInfo = grabUserData()
    setCodeCriteria(userInfo.code)
      //update the isButtonActive state if all conditions are met
    const res = checkSubmitButtonCriteria(userInfo);
    setIsButtonActive(res)
  }

  //grabs the data from the input and places in object.
  function grabUserData(){
    return{
      title : subAct,
      email : userEmailDom.current.value,
      passCurr : userCurrPassDom.current?.value,
      passNew1 : userNewPassDom1.current?.value,
      passNew2 : userNewPassDom2.current?.value,
      code : userCodeDom.current?.value,
    }
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
        url = `user/signup?userId=${currUser}&userEmail=${userInfo.email}&userPassword=${userInfo.passCurr}`;
        options.method = 'DELETE';
        options.headers = {
          'Content-Type': 'application/json'
        };
        break;
      }
      case('reset'):{
        console.log('reset')
        // url = "user/signup"
        url = `user/signup?userId=${currUser}&userEmail=${userInfo.email}&password=${userInfo.passCurr}&newPassword=${userInfo.passNew1}`
        options.method = 'PUT';
        body.userId = currUser;
        body.email = userInfo.email;
        body.password = userInfo.passCurr
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

  //
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

  function handleDeleteClick(){
    popupDispatch({type: 'myAuth', subAct: 'delete'})
  }

  function handleResetClick(){
    popupDispatch({type: 'myAuth', subAct: 'reset'})
  }

  function handleSignoffClick(){
    popupDispatch({type:'myAuth', subAct: 'signout'})
  }

  return(
    <PopupContext.Provider value={{userCodeDom, userEmailDom, userNewPassDom1, userCurrPassDom, userNewPassDom2, handleEmailInputChange, handleCurrPasswordInputChange, handleNewPasswordInputChange1, handleNewPasswordInputChange2, handleCodeInputChange, passwordCriteria, emailCriteria, codeCriteria, loginFail, signupFail, setSignupFail, buttonDom, popupDispatch, handleLoginTabClick, handleSignupTabClick, handleForgotClick, handleVerifyClick, setCurrUser, currUser, setLoginFail, isButtonActive, handleSubmitClickRef, buttonDom, success, setSuccess, handleDeleteClick, handleResetClick, handleSignoffClick}}>
        <div className = 'acctPopup'>
          {currentPopup}
        </div>
    </PopupContext.Provider>
  )
}


export default PopupAuth;