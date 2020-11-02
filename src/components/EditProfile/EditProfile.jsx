import React from 'react';

import './EditProfile.css';

const EditProfile = () => {
  return (
    <div className="edit-profile">
      <form action="" className="form-create">
        <h3>Edit Profile</h3>
        <label htmlFor="username" className="label">Username</label>
        <input type="text" className="input" placeholder="Username" />
                
        <label htmlFor="email" className="label">Email address</label>
        <input type="email" className="input" placeholder="Email address" />
                
        <label htmlFor="password" className="label">New password</label>
        <input type="password" className="input" placeholder="New password" />
                
        <label htmlFor="password" className="label">Avatar image (url)</label>
        <input type="text" className="input" placeholder="Avatar image" />
                
        <button type="button" className="btn-primary">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;