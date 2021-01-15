import React from 'react';
import { connect } from 'react-redux';

import ProfileForm from './ProfileForm'
import Spiner from '../Spiner';

import './EditProfile.css';

const EditProfile = (props) => {
  const token = localStorage.getItem('token');
  const { user, isLoggedIn } = props;
    
  return isLoggedIn
          ? <ProfileForm user={user} token={token} />
          : <Spiner />;
};

const mapStateToProps = (state) => {
  const { user, currentUser, isLoggedIn } = state.userReducer;
  return { user, currentUser, isLoggedIn };
}

export default connect(mapStateToProps)(EditProfile);
