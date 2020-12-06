import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logoutAction, updateUser } from '../../actions';

import userImg from '../../images/user.svg';

import './HeaderTab.css';

const HeaderTab = (props) => {
  
  const hasUser = localStorage.getItem('localUser');
  
  
  const dispatch = useDispatch();

  const content = useSelector((state) => state);
  
  const { token } = props;

  const updateHeader = () => {
    if (hasUser) dispatch(updateUser(token));
  }

  useEffect(() => {
    updateHeader();
  }, []);

  
  
  const { isLoggedIn/* , errorsResponse */ } = content;
  /* console.log('errorsResponse: ', errorsResponse); */
  
  const user = isLoggedIn ? content.user : null;
  
  
  /* Веменная функция для имитации выхода */
  const handleLogOut = () => {
    dispatch(logoutAction());
    localStorage.removeItem('localUser');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn'); /* Это скорее всего не надо */
    props.history.push('/sign-in');
  }

  const handleCreateArticle = () => {
    isLoggedIn ? props.history.push('/new-article') : props.history.push('/');
  }

  const loadMyArticles = () => {
    isLoggedIn ? props.history.push('/my-articles') : props.history.push('/');
  }
  
  return (
    <header className="header">
      <h3 className="header__title">
        <Link to="/" className="home-link">Realworld Blog</Link>
      </h3>
      
      { user ? <UserProfile user={user} handleLogOut={handleLogOut} handleCreateArticle={handleCreateArticle} loadMyArticles={loadMyArticles} /> : <NavbarRending {...props} />}

    </header>
  );
};

const NavbarRending = (props) => {
  return (
    <div className="button-group">
      <button className="btn header__signin" onClick={() => props.history.push('/sign-in')}>Sign in</button>
      <button className="btn header__signup" onClick={() => props.history.push('/sign-up')}>Sign up</button>
    </div>
  );
};

const UserProfile = (props) => {
  return (
    <div className="button-group">

      <button className="btn btn-my-articles" onClick={props.loadMyArticles}>My articles</button>
      
      
      <button className="btn btn-create-article" onClick={props.handleCreateArticle}>Create article</button>
      <div className="user-name">
        <Link to="/profile" className="user-name-link">{props.user.username}</Link> {/* Поправиь классы текста, т.к. теперь это синяя ссылка, убрать span, добавить класс Link */}
        <Link to="/profile">
          {
            props.user.image ? <img src={props.user.image} alt="User" /> : <img src={userImg} alt="User" />
          }
        </Link>
      </div>
      <button className="btn btn-logout" onClick={props.handleLogOut}>Log Out</button>
    </div>
  );
};

export default withRouter(HeaderTab);