import React, {useContext, useState} from 'react';
import { useForm } from "react-hook-form";
import { PopupAuthContext } from './PopupAuth';
import { fetchCall } from '../../../functions/fetches/api';
import { usePopup } from '../../../hooks/usePopup';

  //forgot password popup box
function PopupAuthForgot(){
  const { popupDispatch } = usePopup();
  const {
    handleLoginTabClick, 
    handleSignupTabClick, 
  } = useContext(PopupAuthContext);

  const [submitFail, setSubmitFail] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

    //fetch to start the email reset process
  async function handleSubmitClick(data){
    const email = data.email.toLowerCase();
    const response = await fetchCall.put('forgot', { email });
    if (response.isPasswordReset) {
      popupDispatch({ type: 'myAuth', subAct: 'login' }); 
    } else {
      setSubmitFail(true);
    }
  }

  return(
    <div className="entireBox" >
      <div id='loginTab' className="eachTab selectedTab" onClick={handleLoginTabClick}>login</div>
      <div id='signupTab' className="eachTab selectedTab" onClick={handleSignupTabClick}>signup</div>

      <form onSubmit={handleSubmit(handleSubmitClick)}>
        <div className="mainInput">

          <div className='lineInstructions'>
            Enter your email associated with your account and then submit.  You will be provided a code to change your password.
          </div>
          

          <div className='line'>
            <div className='inputDiv'>
              <input 
                className='inputContent' 
                autoComplete="username" 
                placeholder='email' 
                {...register("email", 
                  { 
                    required: 'Email is required', minLength: { value: 3, message: "Incomplete email address" }, 
                    pattern: {
                      value: /.*@.*/,
                      message: "Email must include '@'"
              }  })} />
              {errors.email && <div className="error">{errors.email.message}</div>}
            </div>
          </div>

          <div className='line'>
            <div className='inputDiv'>
              {submitFail && <div className="error">Unable to send you a temporary password.</div>}
            </div>
          </div>

          <div className="line">
            <div className='inputDiv'>
              <input type="submit" className='submitButton' id='authLoginsubmitButton' />
            </div>
          </div>

        </div>
      </form>
    </div>


    
  )
}

export default PopupAuthForgot