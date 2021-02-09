import React from "react";
import { format } from "date-fns";
import MarkdownView from "react-showdown";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { Popconfirm } from "antd";

import Like from "../ArticlePreview/Like";

import { getLocalData } from "../../service/local-service";

const Article = (props) => {
  const {
    article,
    isLoggedIn,
    username,
    onChangFavoriteArticle,
    confirm,
    cancel,
    onClickEdit,
  } = props;
  const {
    slug,
    title,
    description,
    body,
    createdAt,
    favorited,
    favoritesCount,
    tagList,
    author,
  } = article;
  const token = getLocalData("token");

  return (
    <div className="article">
      <div className="article-item__header">
        <div className="article-item__block">
          <div className="article-item__info">
            <h2 className="article-item__title">{title}</h2>
            <Like
              favorited={favorited}
              favoritesCount={favoritesCount}
              onChangFavoriteArticle={onChangFavoriteArticle}
            />
          </div>
          <div className="article-item__tags">
            {tagList.length !== 0
              ? tagList.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))
              : null}
          </div>
        </div>
        <div className="article-item__block flex-row">
          <div className="article-item__creator">
            <div className="article-item__author">{author.username}</div>
            <span className="article-item__date">
              {format(new Date(createdAt), "MMMM d, y")}
            </span>
          </div>
          <img
            src={author.image}
            className="article-item__avatar"
            alt="User's avatar"
          />
        </div>
      </div>

      <div className="annotation-block">
        <div className="article-item__annotation">{description}</div>
        <div>
          {isLoggedIn && username === author.username ? (
            <div>
              <Popconfirm
                placement="right"
                title="Are you sure to delete this article?"
                onConfirm={() => confirm(slug, token, username)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                overlayClassName="popup"
              >
                <button type="button" className="btn-del-myself">
                  Delete
                </button>
              </Popconfirm>
              <button
                type="button"
                onClick={() => onClickEdit(slug)}
                className="btn-edit-myself"
              >
                Edit
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="article-body">
        <MarkdownView markdown={body} options={{ tables: true, emoji: true }} />
      </div>
    </div>
  );
};

Article.propTypes = {
  article: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  onChangFavoriteArticle: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
};

export default withRouter(Article);
