import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logoutAction } from '../../actions';

/* import userImg from '../../images/user.svg'; */

import './HeaderTab.css';

const HeaderTab = (props) => {
  const dispatch = useDispatch();
    
  const content = useSelector((state) => state);
  
  const { isLoggedIn, errorsResponse } = content;
  console.log('errorsResponse: ', errorsResponse);
  
  const user = isLoggedIn ? content.user : null;
  
  
  /* Веменная функция для имитации выхода */
  const handleLogOut = () => {
    dispatch(logoutAction());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    props.history.push('/sign-in');
  }

  const handleCreateArticle = () => {
    isLoggedIn ? props.history.push('/new-article') : props.history.push('/');
  }
  
  return (
    <header className="header">
      <h3 className="header__title">
        <Link to="/" className="home-link">Realworld Blog</Link>
      </h3>
      
      { user ? <UserProfile user={user} handleLogOut={handleLogOut} handleCreateArticle={handleCreateArticle}/> : <NavbarRending {...props} />}

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
      <button className="btn btn-create-article" onClick={props.handleCreateArticle}>Create article</button>
      <div className="user-name">
        <Link to="/profile" className="user-name-link">{props.user.username}</Link> {/* Поправиь классы текста, т.к. теперь это синяя ссылка, убрать span, добавить класс Link */}
        <Link to="/profile"><img src={props.user.image} alt="User" /></Link>
      </div>
      <button className="btn btn-logout" onClick={props.handleLogOut}>Log Out</button>
    </div>
  );
};

export default withRouter(HeaderTab);