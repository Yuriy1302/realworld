import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Like from './Like';

import { setFavoriteArticle } from '../../actions';

import './ArticlePreview.css';
import userImg from '../../images/user.svg';

const ArticlePreview = (props) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const { article, pageCurrent } = props;
  const {
    title,
    description,
    tagList,
    createdAt,
    favorited,
    favoritesCount,
    slug,
    author } = article;
  const { username, image } = author;
  
  const onChangFavoriteArticle = () => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      dispatch(setFavoriteArticle(slug, token, pageCurrent * 20 - 20));
    }
  }

  return (
    <div className="article-item">
      <div className="article-item__header">
          <div className="article-item__block">
            <div className="article-item__info">
              <h2 className="article-item__title">
                <Link to={`/articles/${slug}`}>
                  {title}
                </Link>
              </h2>
              <Like favorited={favorited}
                    favoritesCount={favoritesCount}
                    onChangFavoriteArticle={onChangFavoriteArticle} />
            </div>
            <div className="article-item__tags">
            {
              tagList.length !== 0
                ? tagList.map((tag, index) => <span className="tag" key={index}>{tag}</span>)
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
        {description}
      </div>
    </div>
  );
};

export default ArticlePreview;
