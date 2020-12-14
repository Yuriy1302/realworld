import { format } from 'date-fns';
import { connect, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import MarkdownView from 'react-showdown';
import { Popconfirm, message } from 'antd';
import { withRouter } from 'react-router-dom';
import uniqueid from 'lodash.uniqueid';

import Spiner from '../Spiner';
import Like from '../ArticlePreview/Like';

import { getArticle, deleteArticle, setFavoriteArticle } from '../../actions';

import './Article.css';

const articleRender = (article, isLoggedIn, username, onChangFavoriteArticle, props) => {
  
  const {
    slug,
    title,
    description,
    body,
    createdAt,
    favorited,
    favoritesCount,
    tagList,
    author
  } = article;

  const token = localStorage.getItem('token');

  const confirm = () => {
    message.success('Click on Yes');
    deleteArticle(slug, token, username);
    props.history.push(`/my-articles`);
  }

  const cancel = () => {
    message.error('Click on No');
  }

  return (
    <div className="article">
      <div className="article-item__header">
        <div className="article-item__block">
          <div className="article-item__info">
            <h2 className="article-item__title">{title}</h2>
            <Like favorited={favorited}
                    favoritesCount={favoritesCount}
                    onChangFavoriteArticle={onChangFavoriteArticle} />
          </div>
          <div className="article-item__tags">
            { tagList.length !== 0
                ? tagList.map((tag) => <span className="tag" key={uniqueid()}>{tag}</span>)
                : null
            }            
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

      <div className="annotation-block">
        <div className="article-item__annotation" >{description}</div>
        <div>
          {
            isLoggedIn && username === author.username
              ? <div>
                  <Popconfirm
                    placement="right"
                    title="Are you sure to delete this article?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                    overlayClassName="popup"
                  >
                    <button type="button" className="btn-del-myself">Delete</button>
                  </Popconfirm>
                  <button type="button" onClick={() => { props.history.push(`/articles/${slug}/edit`)}} className="btn-edit-myself">Edit</button>
                </div>
              : null
          }
        </div>
      </div>
      <div className="article-body">
        <MarkdownView markdown={body} options={{ tables: true, emoji: true }} />
      </div>
    </div>
  );
};

const Article = (props) => {
  const { slug, article, loader, isLoggedIn, username } = props;
  const dispatch = useDispatch();

  const onChangFavoriteArticle = () => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      dispatch(setFavoriteArticle(slug, token));
    }
  }

  useEffect(() => {
    async function fetchData() {
      dispatch(getArticle(slug));
    }
    fetchData();
    // eslint-disable-next-line  
  }, []);

  if (loader) {
    return <Spiner />
  }

  return (
    article ? articleRender(article, isLoggedIn, username, onChangFavoriteArticle, props) : null
  );
};

const mapStateToProps = (state) => {
  const { article, loader, isLoggedIn, user } = state;
  return {
    article,
    loader,
    isLoggedIn,
    username: user.username
  };
}



export default connect(mapStateToProps, { getArticle, deleteArticle })(withRouter(Article));
