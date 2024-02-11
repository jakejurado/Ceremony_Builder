import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { PopupContext } from './PopupAuth';
import { fetchCall } from '../functions/fetches/api';

//login popup.  This is a child component of PopupAuth.
function PopupAuthLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [signinFail, setSigninFail] = useState(false);

  const {
    handleSignupTabClick, 
    handleForgotClick,
    setCurrUser, 
    popupDispatch, 
  } = useContext(PopupContext)

    //fetch request to login.
  async function handleSubmitClick(result){
    const email = result.email
    const password = result.password
    const response = await fetchCall.get('login', { email, password });
    if (response.authenticated) {
      setCurrUser(response.userId); // updates user
      popupDispatch({ type: null, act: null }); // removes popup
    } else {
      setSigninFail(true); //updates loginFail
    }
  }
    
  return (
    <div className="entireBox">
      <div id='loginTab' className="eachTab">login</div>
      <div id='signupTab' onClick={handleSignupTabClick} className="eachTab selectedTab">signup</div>
      <div className='mainInput'>
        <form onSubmit={handleSubmit(handleSubmitClick)}>

          <div className='line'>
            <div className='inputDiv'>
              <input className='inputContent' autoComplete="username" placeholder='email' {...register("email", { required: 'Email is required', minLength: { value: 6, message: "Incomplete email address" } })} />
              {errors.email && <div className="error">{errors.email.message}</div>}
            </div>
          </div>

          <div className='line'>
            <div className='inputDiv'>
              <input className='inputContent' type='password' autoComplete="current-password" placeholder='password' {...register("password", { required: 'Password is required', minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
              {errors.password && <div className="error" style={{ color: 'red' }}>{errors.password.message}</div>}
            </div>
          </div>

          <div className='inputDiv'>
            {signinFail && <div className="error">Incorrect email or password</div>}
          </div>

          <div className="line">
            <div className='inputDiv'>
              <input type="submit" className='submitButton' id='authLoginsubmitButton' />
            </div>
          </div>

        </form>
        <div className='footerNote' onClick={handleForgotClick}>forgot password? </div>
      </div>
    </div>
  )
}


export default PopupAuthLogin