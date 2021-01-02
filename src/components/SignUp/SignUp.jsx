import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { notification } from 'antd';
import classNames from 'classnames';

import { registration } from '../../actions';

import './SignUp.css';

const SignUp = (props) => {
  const { isLoggedIn, serverErrors } = useSelector((state) => state);

  const dispatch = useDispatch();
  
  const { register, handleSubmit, errors } = useForm();
  const [ password, setPassword ] = useState('');

  if (isLoggedIn) {
    notification.success({
      message: "Welcom",
      description: "Вы успешно зарегистрировались!",
      duration: 4
    });
    // eslint-disable-next-line
    props.history.push('/');
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const onSignUp = (data) => {
    dispatch(registration(data));
  }

  return (
    <div className="create-new-accaunt">
      <form action="" className="form-create" onSubmit={handleSubmit(onSignUp)}>
        <h3>Create new account</h3>
        <label htmlFor="username" className="label">Username</label>
        <input type="text"
               name="username"
               id="username"
               className={classNames({ "input-form": true, "input-error": errors.username })}
               placeholder="Username"
               ref={register({ required: true, minLength: 3, maxLength: 20 })}
        />
        { errors.username?.type === 'required' && <span className="text-danger">The field must be filled</span>}
        { errors.username?.type === 'minLength' && <span className="text-danger">Needs to be at least 3 characters</span>}
        { errors.username?.type === 'maxLength' && <span className="text-danger">Must be no more than 20 characters long</span>}
        {/* { serverErrors && serverErrors.hasOwnProperty('username') && <span className="text-danger">{serverErrors.username[0][0].toUpperCase() + serverErrors.username[0].slice(1)}</span>} */}
        { serverErrors && 'username' in serverErrors && <span className="text-danger">{serverErrors.username[0][0].toUpperCase() + serverErrors.username[0].slice(1)}</span>}


        <label htmlFor="email" className="label">Email address</label>
        <input type="email"
               name="email"
               id="email"
               className={classNames({ "input-form": true, "input-error": errors.email })}
               placeholder="Email address"
               ref={register({ required: true,
                               // eslint-disable-next-line
                               pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                             })
                    }
        />
        { errors.email?.type === 'required' && <span className="text-danger">The field must be filled</span> }
        { errors.email?.type === 'pattern' && <span className="text-danger">Needs to enter a valid address</span> }
        {/* { serverErrors && serverErrors.hasOwnProperty('email') && <span className="text-danger">{serverErrors.email[0][0].toUpperCase() + serverErrors.email[0].slice(1)}</span>} */}
        { serverErrors && ('email' in serverErrors) && <span className="text-danger">{serverErrors.email[0][0].toUpperCase() + serverErrors.email[0].slice(1)}</span>}


        <label htmlFor="password" className="label">Password</label>
        <input type="password"
               name="password"
               id="password"
               onChange={onChangePassword}
               className={classNames({ "input-form": true, "input-error": errors.password })}
               placeholder="Password"
               ref={register({ required: true, minLength: 8, maxLength: 40 })}
        />
        { errors.password?.type === 'required' && <span className="text-danger">The field must be filled</span>}
        { errors.password?.type === 'minLength' && <span className="text-danger">Your password needs to be at least 8 characters</span>}
        { errors.password?.type === 'maxLength' && <span className="text-danger">Your password must be no more than 40 characters long</span>}

        <label htmlFor="confirmPassword" className="label">Repeat Password</label>
        <input type="password"
               id="confirmPassword"
               name="confirmPassword"
               className={classNames({ "input-form": true, "input-error": errors.confirmPassword })}
               placeholder="Password"
               ref={register({
                 validate: value => value === password
               })}
        />
        { errors.confirmPassword && <span className="text-danger">Passwords must match</span> }

        <div className="hr" />
        
        <div className="rules-block">
          <input type="checkbox"
                 id="rules"
                 name="rules"
                 ref={register({ required: true })}
          />
          <label htmlFor="rules" className="rules">
            I agree to the processing of my personal 
            information
          </label>
          { errors.rules && <span className="text-danger"><br />The field must be checked</span>}
        </div>

        <button type="submit" className="btn-primary">Create</button>
        <span className="footnote">Already have an account? <Link to="/sign-in">Sign In</Link></span>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
