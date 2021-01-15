import React, { useEffect } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import NavbarRending from './NavbarRending';
import UserProfile from './UserProfile';

import { logoutAction, restartUser } from '../../actions';

import './HeaderTab.css';

const HeaderTab = (props) => {
  const hasUser = localStorage.getItem('localUser');

  const dispatch = useDispatch();
  const content = useSelector((state) => state.userReducer);
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



export default withRouter(HeaderTab);
