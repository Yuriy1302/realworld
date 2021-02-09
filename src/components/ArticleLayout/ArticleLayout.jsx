import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { notification } from "antd";

import Spiner from "../Spiner";
import Article from "./Article";

import {
  getSingleArticle,
  deleteArticle,
  setFavoriteArticle,
  deleteFavoriteArticle,
} from "../../actions";

import { getLocalData } from "../../service/local-service";

import "./ArticleLayout.css";

const ArticleLayout = (props) => {
  const { slug } = props;
  const { loader } = useSelector((state) => state.genericReducer);
  const { article } = useSelector((state) => state.articlesReducer);
  const { isLoggedIn, user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const token = getLocalData("token");

  const confirm = (slug, token, username) => {
    notification.success({
      message: "Article was deleted",
      duration: 2,
    });
    dispatch(deleteArticle(slug, token, username));
    props.history.push(`/my-articles`);
  };

  const cancel = () => {
    notification.info({
      message: "Canceled",
      duration: 2,
    });
  };

  const onClickEdit = (slug) => {
    props.history.push(`/articles/${slug}/edit`);
  };

  const onChangFavoriteArticle = () => {
    if (isLoggedIn && !article.favorited) {
      dispatch(setFavoriteArticle(slug, token));
    }

    if (isLoggedIn && article.favorited) {
      dispatch(deleteFavoriteArticle(slug, token));
    }
  };

  useEffect(() => {
    function fetchData() {
      dispatch(getSingleArticle(slug, token));
    }
    fetchData();
    // eslint-disable-next-line
  }, [slug]);

  if (loader) {
    return <Spiner />;
  }

  return (
    article && (
      <Article
        article={article}
        isLoggedIn={isLoggedIn}
        username={user.username}
        onChangFavoriteArticle={onChangFavoriteArticle}
        confirm={confirm}
        cancel={cancel}
        onClickEdit={onClickEdit}
      />
    )
  );
};

export default withRouter(ArticleLayout);
