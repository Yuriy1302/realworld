import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { notification } from 'antd';

import Spiner from '../Spiner';
import ArticleRender from './ArticleRender';

import {
  getSingleArticle,
  deleteArticle,
  setFavoriteArticle,
  deleteFavoriteArticle } from '../../actions';

import './Article.css';



const Article = (props) => {
  const { slug, article, loader, isLoggedIn, username } = props;
  const dispatch = useDispatch();

  const confirm = (slug, token, username) => {
    notification.success({
      message: "Article was deleted",
      duration: 2
    });
    dispatch(deleteArticle(slug, token, username));
    props.history.push(`/my-articles`);
  }

  const onChangFavoriteArticle = () => {
    if (isLoggedIn && !article.favorited) {
      const token = localStorage.getItem('token');
      dispatch(setFavoriteArticle(slug, token));
    }

    if (isLoggedIn && article.favorited) {
      const token = localStorage.getItem('token');
      dispatch(deleteFavoriteArticle(slug, token));
    }
  }

  useEffect(() => {
    function fetchData() {
      const token = localStorage.getItem('token');
      dispatch(getSingleArticle(slug, token));
    }
    fetchData();
    // eslint-disable-next-line  
  }, [slug]);

  if (loader) {
    return <Spiner />
  }

  return (
    article ? <ArticleRender
                article={article}
                isLoggedIn={isLoggedIn}
                username={username}
                onChangFavoriteArticle={onChangFavoriteArticle}
                confirm={confirm}
              /> : null
  );
};

const mapStateToProps = (state) => {
  const { loader } = state.genericReducer;
  const { article } = state.articlesReducer;
  const { isLoggedIn, user } = state.userReducer;
  return {
    loader,
    article,
    isLoggedIn,
    username: user.username
  };
}

export default connect(mapStateToProps)(withRouter(Article));
