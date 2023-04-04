import React, {useContext, createContext, useRef, useReducer, useEffect} from 'react'
import PopupForgot from './PopupForgot';
import PopupLogin from './PopupLogin';
import PopupSignup from './PopupSignup';
import PopupVerify from './PopupVerify';
import { GlobalContext} from "./App";

//holds popup context;
export const PopupContext = createContext(null);

function PopupAccount({curr}){
  const {setPopup} = useContext(GlobalContext)

  const inputDom = useRef(null);

  const [popupBox, dispatch] = useReducer(reducer, {title: 'login', display: <PopupLogin />});

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

  useEffect(()=>{
    dispatch({type: curr})
  }, [])


  function handleBackgroundClick(){
    setPopup(null);
  }

  function handleSubmitClick(){
    const elements = [...inputDom.current.children];
    const title = popupBox.title;

    // console.log(elements[0].children[0]);
    // console.log(elements[0].children[0].innerText.slice(0, -1));
    // console.log(elements[0].children[1].querySelector('.inputContent').value);

    const obj={}
    elements.forEach(el => {
      if(el.classList.contains('line')){
        const key = el.children[0].innerText.slice(0,-1).split(" ").join('');
        const val = el.children[1].querySelector('.inputContent').value;
        // console.log(el.children[0].innerText.slice(0,-1));
        // console.log(el.children[1].querySelector('.inputContent').value);
        if(obj.hasOwnProperty('key') && obj[key] === value);

        obj[key] = val;
      }
    })
    console.log(obj);
  }

  return(
    <PopupContext.Provider value={{dispatch, inputDom}}>
      <div id='popupContainer'>
        <div id='popupBackground' onClick={handleBackgroundClick}></div>
        <div class = 'acctPopup'>
          <div class="entireBox" >
            <div class='eachTab' onClick={()=>dispatch({type: 'login'})}>login</div>
            <div class='eachTab' onClick={()=>dispatch({type: 'signup'})}>signup</div>
            {popupBox.display}
            <div class="bottomBox">
              <button onClick={handleSubmitClick}>
                Submit
              </button>
            </div>

          
          </div>

        </div>
      </div>
    </PopupContext.Provider>
  )
}


export default PopupAccount;