import React, {useContext, useState} from 'react';
import { useForm } from "react-hook-form";
import { PopupContext } from './PopupAuth';
import { fetchCall } from '../functions/fetches/api';

  //Reset password component box.
function PopupAuthReset(){
  const {
    currUser,
    handleDeleteClick,
    handleSignoffClick,
  } = useContext(PopupContext);

  const [submitFail, setSubmitFail] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

    //fetch request to reset password
  async function handleSubmitClick(data){
    const userId = currUser
    const email = data.email.toLowerCase();
    const password = data.currentPassword;
    const newPassword = data.password;
    const response = await fetchCall.put('reset', { email, password, newPassword, userId});
    if (response.isPasswordReset) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } else {
      setSubmitFail(true);
    }
  }



  return(
    <div className="entireBox" >
      <div id='signOutTab' className="eachTab selectedTab" onClick={handleSignoffClick} >Signout</div>
      <div id='passwordTab' className="eachTab">Password</div>
      <div id='DeleteTab' className="eachTab selectedTab" onClick={handleDeleteClick} >Delete</div>

      <form onSubmit={handleSubmit(handleSubmitClick)}>
        <div className="mainInput">          
          <h2>Reset Password</h2>

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
              <input className='inputContent' type='password' autoComplete="current-password" placeholder='current password' {...register("currentPassword", { required: 'Password is required', minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
              {errors.password && <div className="error" style={{ color: 'red' }}>{errors.password.message}</div>}
            </div>
          </div>
          
          <div className='line'>
            <div className='inputDiv'>
              <input className='inputContent' type='password' placeholder='new password' {...register("password", { required: 'Password is required', minLength: 6 })} />
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
              {submitFail && <div className="error">Unable to update your password.</div>}
            </div>
          </div>

          <div className='line'>
            <div className='inputDiv'>
              {success && <div className="complete">Your password has been reset.</div>}
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

export default PopupAuthReset