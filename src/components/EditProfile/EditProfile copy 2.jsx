import React/* , { useState } */ from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { notification } from 'antd';

import Spiner from '../Spiner';

import { updateNewData } from '../../actions';

import './EditProfile.css';

const EditProfile = (props) => {
  const token = localStorage.getItem('token');
  const { user, updateNewData } = props;
  
  
  return user ? <ProfileForm user={user} token={token} updateNewData={updateNewData} /> : <Spiner />; 
  
};

const mapStateToProps = (state) => {
  const { user, currentUser, isLoggedIn } = state;
  return { user, currentUser, isLoggedIn };
}


const ProfileForm = (props) => {
  const { username, email } = props.user;
  const { token, updateNewData } = props;
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      username,
      email
    }
  });

  /* const [ passwordData, setPasswordData ] = useState('');
  const [ urlData, setUrlData ] = useState(''); */

  /* Отправка новых данных здесь */
  const onSubmitProfile = (data) => {
    let newData = {};
    for (let item in data) {
      if (data[item] !== '') {
        newData[item] = data[item];
      }
    }
    /* console.log('OnSubmitProfile: ', newData);
    console.log('OnSubmitProfile: ', JSON.stringify({
                                                      user: newData
                                                    })); */
    updateNewData(token, newData);
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
               ref={register({ required: true, minLength: 3, maxLength: 20 })}
        />
        { errors.username?.type === 'required' && <span className="text-danger">The field must be filled</span>}
        { errors.username?.type === 'minLength' && <span className="text-danger">Needs to be at least 3 characters</span>}
        { errors.username?.type === 'maxLength' && <span className="text-danger">Must be no more than 20 characters long</span>}

        <label htmlFor="email" className="label">Email address</label>
        <input type="email"
               name="email"
               className="input"
               placeholder="Email address"
               ref={register({ required: true,
                               pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })
                    }
        />
        { errors.email?.type === 'required' && <span className="text-danger">The field must be filled</span> }
        { errors.email?.type === 'pattern' && <span className="text-danger">Needs to enter a valid address</span> }

        <label htmlFor="password" className="label">New password</label>
        <input type="password"
               name="password"
               className="input"
               placeholder="New password"
               /* value={passwordData} */
               /* onChange={(e) => { setPasswordData(e.target.value); console.log(e.target.value); } } */
               /* ref={passwordData.length ? register({ minLength: 8, maxLength: 40 }) : unregister} */
               ref={register({ minLength: 8, maxLength: 40 })}
        />
        { errors.password?.type === 'minLength' && <span className="text-danger">Your password needs to be at least 8 characters</span>}
        { errors.password?.type === 'maxLength' && <span className="text-danger">Your password must be no more than 40 characters long</span>}
        

        <label htmlFor="password" className="label">Avatar image (url)</label>
        <input type="text"
               name="image"
               className="input"
               placeholder="Avatar image"
               /* value={urlData} */
               /* onChange={(e) => setUrlData(e.target.value) } */
               /* ref={urlData.length ? register({ pattern: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ })
                                   : unregister} */
               ref={register({ pattern: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ })}
        />
        { errors.image?.type === 'pattern' && <span className="text-danger">Needs to enter a valid URL</span> }

        <button type="submit" className="btn-primary">Save</button>
      </form>
    </div>
  );
}

export default connect(mapStateToProps, { updateNewData })(EditProfile);