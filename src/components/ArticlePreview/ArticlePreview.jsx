import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { notification } from 'antd';

import Like from './Like';
import ErrorIndicator from '../ErrorIndicator';

import { setFavoriteArticle, deleteFavoriteArticle } from '../../actions';

import { getLocalData } from '../../service/local-service';

import './ArticlePreview.css';
import userImg from '../../images/user.svg';

const ArticlePreview = (props) => {
  const token = getLocalData('token');
  const { isLoggedIn } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const { article } = props;
  const { title, description,
          tagList, createdAt, favorited,
          favoritesCount, slug, author } = article;
  
  if (author === undefined) {
    return <ErrorIndicator />
  }

  const { username, image } = author;
  
  const onChangFavoriteArticle = () => {
    if (isLoggedIn && !favorited) {
      dispatch(setFavoriteArticle(slug, token));
    } else if (!isLoggedIn && !favorited) {
      notification.warning({
        message: "Login or register to follow articles",
        duration: 2
      });
    }

    if (isLoggedIn && favorited) {
      dispatch(deleteFavoriteArticle(slug, token));
    }
  }

  const cropText = (text, size) => {
    let newText = '';
    const endCharacter = '...';
  
    if (text.length > size) {
      newText = text.substr(0, size);
      return newText + endCharacter;
    }

    return text;
  }

  return (
    <div className="article-item">
      <div className="article-item__header">
          <div className="article-item__block">
            <div className="article-item__info">
              <h2 className="article-item__title">
                <Link to={`/articles/${slug}`}>{cropText(title, 50)}</Link>
              </h2>
              <Like favorited={favorited}
                    favoritesCount={favoritesCount}
                    onChangFavoriteArticle={onChangFavoriteArticle} />
            </div>
            <div className="article-item__tags">
            {
              tagList.length !== 0
                ? tagList.map((tag, index) => <span className="tag" key={index}>{cropText(tag, 15)}</span>)
                : null
            }
            </div>
          </div>
          <div className="article-item__block flex-row">
            <div className="article-item__creator">
              <div className="article-item__author">{username}</div>
              <span className="article-item__date">{format(new Date(createdAt), 'MMMM d, y')}</span>
            </div>
            {
              image
                ? <img src={image} className="article-item__avatar" alt="User's avatar" />
                : <img src={userImg} className="article-item__avatar" alt="User's avatar" />
            }
          </div>
      </div>
      <div className="article-item__annotation">
        {cropText(description, 120)}
      </div>
    </div>
  );
};

export default ArticlePreview;
