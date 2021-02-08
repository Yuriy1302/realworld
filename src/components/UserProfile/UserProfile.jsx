import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import userImg from '../../images/user.svg';

const UserProfile = (props) => {
  const { loadMyArticles, handleCreateArticle, user, handleLogOut } = props;
  return (
    <div className="button-group">
      <button type="button" className="btn btn-my-articles" onClick={loadMyArticles}>My articles</button>
      <button type="button" className="btn btn-create-article" onClick={handleCreateArticle}>Create article</button>
      <div className="user-name">
        <Link to="/profile" className="user-name-link">{user.username}</Link>
        <Link to="/profile">
          {
            user.image ? <img src={user.image} alt="User" /> : <img src={userImg} alt="User" />
          }
        </Link>
      </div>
      <button type="button" className="btn btn-logout" onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

UserProfile.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
  loadMyArticles: PropTypes.func.isRequired,
  handleCreateArticle: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withRouter(UserProfile);
