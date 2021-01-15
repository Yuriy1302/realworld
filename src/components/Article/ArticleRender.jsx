import React from 'react';
import { format } from 'date-fns';
import uniqueid from 'lodash.uniqueid';
import MarkdownView from 'react-showdown';
import { Popconfirm, notification } from 'antd';

import Like from '../ArticlePreview/Like';

const ArticleRender = (props) => {
  const { article, isLoggedIn, username, onChangFavoriteArticle, confirm } = props;
  const { slug, title, description,
          body, createdAt, favorited,
          favoritesCount, tagList, author } = article;
  const token = localStorage.getItem('token');

  const cancel = () => {
      notification.info({
        message: "Canceled",
        duration: 2
      });
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
                    onConfirm={() => confirm(slug, token, username)}
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

export default ArticleRender;
