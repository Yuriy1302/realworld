import React, { useEffect } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutAction, restartUser } from '../../actions';

import userImg from '../../images/user.svg';

import './HeaderTab.css';

const HeaderTab = (props) => {
  const hasUser = localStorage.getItem('localUser');

  const dispatch = useDispatch();
  const content = useSelector((state) => state.userReducer);
  
  /* const { token } = props; */
  const token = localStorage.getItem('token');

  const updateHeader = () => {
    if (hasUser) {
      dispatch(restartUser(token));
    }
  }

  useEffect(() => {
    updateHeader();
    // eslint-disable-next-line
  }, []);

  const { isLoggedIn } = content;
    
  const user = isLoggedIn ? content.user : null;
  
  const handleLogOut = () => {
    dispatch(logoutAction());
    localStorage.removeItem('localUser');
    localStorage.removeItem('token');
    // eslint-disable-next-line
    props.history.push('/sign-in');
  }

  const handleCreateArticle = () => {
    if (isLoggedIn) {
      // eslint-disable-next-line
      props.history.push('/new-article');
    }
    return null;
  }

  const loadMyArticles = () => {
    if (isLoggedIn) {
      // eslint-disable-next-line
      props.history.push('/my-articles');
    }
    return null;
  }
  
  return (
    <header className="header">
      <h3 className="header__title">
        <Link to="/" className="home-link">Realworld Blog</Link>
      </h3>
      {
        user
          ? <UserProfile user={user}
                          handleLogOut={handleLogOut}
                          handleCreateArticle={handleCreateArticle}
                          loadMyArticles={loadMyArticles} />
          : <NavbarRending {...props} />
      }
    </header>
  );
};

const NavbarRending = (props) => {
  return (
    <div className="button-group">
      <button type="button"
              className="btn header__signin"
              // eslint-disable-next-line
              onClick={() => props.history.push('/sign-in')}
      >
        Sign in
      </button>
      <button type="button"
              className="btn header__signup"
              // eslint-disable-next-line
              onClick={() => props.history.push('/sign-up')}
      >
        Sign up
      </button>
    </div>
  );
};

const UserProfile = (props) => {
  const { loadMyArticles, handleCreateArticle, user, handleLogOut } = props;
  return (
    <div className="button-group">
      <button type="button" className="btn btn-my-articles" onClick={loadMyArticles}>My articles</button>
      <button type="button" className="btn btn-create-article" onClick={handleCreateArticle}>Create article</button>
      <div className="user-name">
        <Link to="/profile" className="user-name-link">{user.username}</Link> {/* Поправиь классы текста, т.к. теперь это синяя ссылка, убрать span, добавить класс Link */}
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

HeaderTab.propTypes = {

}

NavbarRending.propTypes = {

}

UserProfile.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
  loadMyArticles: PropTypes.func.isRequired,
  handleCreateArticle: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired
}

export default withRouter(HeaderTab);
