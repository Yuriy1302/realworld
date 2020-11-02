import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import MarkdownView from 'react-showdown';

import Spiner from '../Spiner';

import { getArticle } from '../../actions';

import './Article.css';

const Article = (props) => {
  
  const { slug, article, loader, getArticle } = props;
  
  useEffect(() => {
    async function fetchData() {
      await getArticle(slug);
    }
    fetchData();    
  }, [slug, getArticle]);

  if (loader) {
    return <Spiner />
  }

  return (
    Object.keys(article).length ? articleRender(article) : null
  );
};

const mapStateToProps = (state) => {
  const { article, loader } = state;
  return {
    article,
    loader
  };
}

const articleRender = (article) => {
  const {
    title,
    description,
    body,
    createdAt,
    favoritesCount,
    tagList,
    author
  } = article;

  return (
    <div className="article">
      <div className="article-item__header">
        <div className="article-item__block">
          <div className="article-item__info">
            <h2 className="article-item__title">{title}</h2>
            <span className="article-item__likes">{favoritesCount}</span>
          </div>
          <div className="article-item__tags">
            { tagList.length !== 0 ? tagList.map((tag, index) => <span className="tag" key={index}>{tag}</span>) : null }
          </div>
        </div>
        <div className="article-item__block flex-row">
          <div className="article-item__creator">
            <div className="article-item__author">{author.username}</div>
            <span className="article-item__date">{format(new Date(createdAt), "MMMM d, y")}</span>
          </div>
          <img src={author.image} className="article-item__avatar" alt="User's avatar" />
        </div>
      </div>
      <div className="article-item__annotation">{description}</div>
      <div className="article-body">
        <MarkdownView markdown={body} options={{ tables: true, emoji: true }} />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, { getArticle })(Article);