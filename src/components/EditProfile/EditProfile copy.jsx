import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

/* import { getCurrentUser } from '../../actions'; */

import './EditProfile.css';

const EditProfile = (props) => {
  
  const { user } = props;
  
  const { register, handleSubmit, errors } = useForm();

  

  const onSubmitProfile = (data) => {
    console.log('OnSubmitProfile: ', data);
  }


  return (
    <div className="edit-profile">
      <form action="" className="form-create" onSubmit={handleSubmit(onSubmitProfile)}>
        <h3>Edit Profile</h3>
        <label htmlFor="username" className="label">Username</label>
        <input type="text"
               name="username"
               className="input"
               placeholder="Username"
               ref={register}
        />


        <label htmlFor="email" className="label">Email address</label>
        <input type="email"
               name="email"
               className="input"
               placeholder="Email address"
               ref={register} />


        <label htmlFor="password" className="label">New password</label>
        <input type="password"
               name="password"
               className="input"
               placeholder="New password"
               ref={register}
        />


        <label htmlFor="password" className="label">Avatar image (url)</label>
        <input type="text"
               name="image"
               className="input"
               placeholder="Avatar image"
               ref={register}
        />


        <button type="submit" className="btn-primary">Save</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user, currentUser, isLoggedIn } = state;
  return { user, currentUser, isLoggedIn };
}

export default connect(mapStateToProps/* , { getCurrentUser } */)(EditProfile);