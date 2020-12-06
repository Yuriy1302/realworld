import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { getArticle } from '../../actions';

import './ArticlePreview.css';
import userImg from '../../images/user.svg';

const ArticlePreview = (props) => {
  const { article, getArticle } = props;
  const {
    title,
    description,
    tagList,
    createdAt,
    favoritesCount,
    slug,
    author } = article;
      
    const { username, image } = author;

  return (
    <div className="article-item">
      <div className="article-item__header">
          <div className="article-item__block">
            <div className="article-item__info">
              <h2 className="article-item__title">
                <Link to={`/articles/${slug}`} onClick={() => getArticle(slug)}>
                  {title}
                </Link>
              </h2>
              <span className="article-item__likes">{favoritesCount}</span>
            </div>
            <div className="article-item__tags">
              {
                tagList.map((tag, index) => <span className="tag" key={index}>{tag}</span>)
              }
            </div>
          </div>
          <div className="article-item__block flex-row">
            <div className="article-item__creator">
              <div className="article-item__author">{username}</div>
              <span className="article-item__date">{format(new Date(createdAt), 'MMMM d, y')}</span>
            </div>
            <img src={image ? image : userImg} className="article-item__avatar" alt="User's avatar" />
          </div>
      </div>
      <div className="article-item__annotation">
        {description}
      </div>
    </div>
  );
};

export default connect(null, { getArticle })(ArticlePreview);
/* export default ArticlePreview; */