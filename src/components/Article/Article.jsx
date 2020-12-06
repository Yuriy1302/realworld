import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MarkdownView from 'react-showdown';
import { Popconfirm, message } from 'antd';

import Spiner from '../Spiner';

import { getArticle, deleteArticle } from '../../actions';

import './Article.css';

const Article = (props) => {
  
  const { slug, article, loader, getArticle, isLoggedIn, username } = props;
  
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
    article ? articleRender(article, isLoggedIn, username, props) : null
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

const articleRender = (article, isLoggedIn, username, props) => {
  const {
    slug,
    title,
    description,
    body,
    createdAt,
    favoritesCount,
    tagList,
    author
  } = article;
  console.log('username: ', username);
  console.log('author: ', author.username);

  const { deleteArticle } = props;
  const token = localStorage.getItem('token');

  /* const onDeleteArticle = () => {
    deleteArticle(slug, token, username);
    props.history.push(`/my-articles`)
  } */

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

      {/* !!!!!!!!!!!!!! Кнопки удаления и редактирования */}

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

export default connect(mapStateToProps, { getArticle, deleteArticle })(withRouter(Article));