import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { authentication, resetErrorsResponse } from '../../actions';

import './SignIn.css';

const SignIn = (props) => {

  const { isLoggedIn, errorsResponse} = useSelector((state) => state);
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  

  console.log('errorsResponse in sign-in: ', errorsResponse);

  if (errorsResponse) {
    return (
      <div className="sign-in-accaunt">
        <h3>Email or password is invalid</h3>
        <button type="button"
                className="btn btn-primary"
                onClick={() => dispatch(resetErrorsResponse())}
        >
          Try again
        </button>
      </div>
    )
  }

  if (isLoggedIn) props.history.push('/');
    

  const onLogIn = (userRegister) => {
    
    dispatch(authentication(userRegister));
    /* props.history.push('/'); */
    /* if (isLoggedIn) props.history.push('/'); */
  }

  return (
    <div className="sign-in-accaunt">
      <form action="" className="form-create" onSubmit={handleSubmit(onLogIn)}>
        <h3>Sign In</h3>
        <label htmlFor="email" className="label">Email address</label>
        <input type="email"
               name="email"
               className={classNames({ "input-form": true, "input-error": errors.email })}
               placeholder="Email address"
               ref={register({ required: true })}
        />
        { errors.email && <span className="text-danger">The field must be filled</span>}
        
        <label htmlFor="password" className="label">Password</label>
        <input type="password"
               name="password"
               className={classNames({ "input-form": true, "input-error": errors.password })}
               placeholder="Password"
               ref={register({ required: true, minLength: 6, maxLength: 40 })}
        />
        { errors.password?.type === 'required' && <span className="text-danger">The field must be filled</span>}
        { errors.password?.type === 'minLength' && <span className="text-danger">Your password needs to be at least 6 characters</span>}
        { errors.password?.type === 'maxLength' && <span className="text-danger">Your password must be no more than 40 characters long</span>}

        <button type="submit" className="btn-primary">Login</button>
        <span className="footnote">Don't have an account? <Link to="/sign-up">Sign Up.</Link></span>
      </form>
    </div>
  )
};

export default withRouter(SignIn);
