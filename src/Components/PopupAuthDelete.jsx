import React, {useContext, useState} from 'react';
import { useForm } from "react-hook-form";
import { PopupContext } from './PopupAuth';
import { fetchCall } from '../functions/fetches/api';

  //Delete user popup box
function PopupAuthDelete(){
  const {
    dispatch,
    currUser,
    setCurrUser,
    popupDispatch,
    handleSignoffClick,
    handleResetClick,
  } = useContext(PopupContext);

  const [submitFail, setSubmitFail] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

    //fetch request to delete user
  async function handleSubmitClick(data){
    const email = data.email;
    const password = data.password;
    const userId = currUser
    const response = await fetchCall.delete('delete', { email, password, userId });
    if (response) {
      popupDispatch({ type: null, act: null }); // removes popup
      setCurrUser(null); //removes current user
      dispatch({type: 'reset', payload: null})
    } else {
      setSubmitFail(true);
    }
  }

  return(
    <div className="entireBox" >
      <div id='signOutTab' className="eachTab selectedTab" onClick={handleSignoffClick} >Signout</div>
      <div id='passwordTab' className="eachTab selectedTab" onClick={handleResetClick}>Password</div>
      <div id='DeleteTab' className="eachTab alertTab" style={{backgroundColor: 'red'}} >Delete</div>
      <form onSubmit={handleSubmit(handleSubmitClick)}>
        <div className="mainInput">
          <div className='signoutBox'>
            
            <h2>Delete Account</h2>

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
                <input className='inputContent' type='password' autoComplete="current-password" placeholder='password' {...register("password", { required: 'Password is required', minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
                {errors.password && <div className="error" style={{ color: 'red' }}>{errors.password.message}</div>}
              </div>
            </div>

            <div className='line'> 
              <div className='inputDiv'>
                {submitFail && <div className="error">Unable to delete your account.</div>}
              </div>
            </div>

            <div className='line'>
              <div className='inputDiv'>
                {success && <div className="complete">Your account has been deleted.</div>}
              </div>
            </div>

            <div className="line">
              <div className='inputDiv'>
                <input type="submit" className='submitButton deleteButton' id='authLoginsubmitButton' />
              </div>
            </div>
            
          </div>
        </div>
      </form>
    </div>
  )
}

export default PopupAuthDelete