import React from 'react';
import { Link } from 'react-router-dom';

import './SignUp.css';

const SignUp = () => {
  return (
    
    <div className="create-new-accaunt">
      <form action="" className="form-create">
        <h3>Create new account</h3>
        <label htmlFor="username" className="label">Username</label>
        <input type="text" className="input" placeholder="Username" />
        <label htmlFor="email" className="label">Email address</label>
        <input type="email" className="input" placeholder="Email address" />
        <label htmlFor="password" className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />
        <label htmlFor="password" className="label">Repeat Password</label>
        <input type="password" className="input" placeholder="Password" />
        
        <div className="hr"></div>
        
        <div className="rules-block">
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox" className="rules">
            I agree to the processing of my personal 
            information
          </label>
        </div>

        <button type="button" className="btn-primary">Create</button>
        <span className="footnote">Already have an account? <Link to="/sign-in">Sign In</Link></span>
      </form>
    </div>
  );
};

export default SignUp;
