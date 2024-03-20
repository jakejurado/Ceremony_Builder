import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { PopupAuthContext } from './PopupAuth';
import { fetchCall } from '../../../functions/fetches/api';
import { usePopup } from '../../../hooks/usePopup';

function PopupAuthSignup() {
  const { popupDispatch } = usePopup();
  const { handleLoginTabClick } = useContext(PopupAuthContext)
  const [signupFail, setSignupFail] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  

  const password = watch("password");

    //fetch request to signup
  async function handleSubmitClick(result){
    const email = result.email.toLowerCase();
    const password = result.password
    const response = await fetchCall.post('signup', { email, password });
    if (response?.authenticated) {
      popupDispatch({type: 'myAuth', subAct: 'login'}); // 
    } else {
      setSignupFail(true);
    }
  }

  return(
    <div className="entireBox">
      <div id='loginTab' onClick={handleLoginTabClick} className="eachTab selectedTab">login</div>
      <div id='signupTab' className="eachTab">signup</div>
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
              <input className='inputContent' type='password' placeholder='password' {...register("password", { required: 'Password is required', minLength: 6 })} />
              {errors.password && <div className="error" style={{ color: 'red' }}>{errors.password.message}</div>}
            </div>
          </div>

          <div className='line'>
            <div className='inputDiv'>
              <input className='inputContent' type='password' placeholder='confirm password' {...register("password2", { 
                validate: value => value === password || 'Passwords do not match'
              })} />
              {errors.password2 && <div className="error" style={{ color: 'red' }}>{errors.password2.message}</div>}
            </div>
          </div>

          <div className='line'>
            <div className='inputDiv'>
              {signupFail && <div className="error">Unable to create an account at this time.</div>}
            </div>
          </div>

          <div className="line">
            <div className='inputDiv'>
              <input type="submit" className='submitButton' id='authLoginsubmitButton' />
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default PopupAuthSignup