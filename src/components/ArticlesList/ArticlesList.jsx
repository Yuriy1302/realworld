import { Pagination } from 'antd';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';

import Spiner from '../Spiner';
import ArticlePreview from '../ArticlePreview';

import { getArticlesList, togglePage } from '../../actions';

import './ArticlesList.css';

const ArticlesList = (props) => {
  const token = localStorage.getItem('token');
  const { getArticlesList, togglePage,
          loader, articles, pageCurrent, articlesCount } = props;
  useEffect(() => {
      if (articles.length !== 0) return false;
      getArticlesList(0, token);
      
      // eslint-disable-next-line
  }, [getArticlesList]); /* !!! Попробовать сделать return для размонтирования */

  const handlePage = (page) => {
    togglePage(page);
    token ? getArticlesList(page * 20 - 20, token) : getArticlesList(page * 20 - 20, null);
  };
  
  return (
    <div className="articles-list">
      <div>
        {
          loader
            ? <Spiner />
            : articles.map((article) => (
                <ArticlePreview key={article.slug} article={article} pageCurrent={pageCurrent} />
              ))
        }
      </div>
      {
        !loader
          ? <div className="pagination">
              <Pagination
                size="small"
                total={articlesCount}
                pageSize={20}
                showSizeChanger={false}
                current={pageCurrent}
                onChange={handlePage}
              />
            </div>
          : null
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  /* const { loader, togglePage, articles, pageCurrent, articlesCount } = state; */
  const { genericReducer, articlesReducer } = state;
  const { loader, pageCurrent } = genericReducer;
  const { articles, articlesCount } = articlesReducer;
  return {
    loader,
    /* togglePage, */
    pageCurrent,
    articles,    
    articlesCount
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticlesList: (page, token) => dispatch(getArticlesList(page, token)),
  togglePage: (page) => dispatch(togglePage(page)),
});

/* export default connect(mapStateToProps, {getArticlesList, togglePage})(ArticlesList); */
export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
