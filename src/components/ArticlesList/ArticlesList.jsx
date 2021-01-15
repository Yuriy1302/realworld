import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';

import Spiner from '../Spiner';
import ArticlePreview from '../ArticlePreview';

import { getArticlesList, togglePage } from '../../actions';

import './ArticlesList.css';

const ArticlesList = (props) => {
  const token = localStorage.getItem('token');
  const { getArticlesList, togglePage,
          loader, articles, pageCurrent, articlesCount } = props;
  
  const handlePage = (page) => {
    console.log(page, ' - ', pageCurrent);
    togglePage(page);
    token ? getArticlesList(page * 20 - 20, token) : getArticlesList(page * 20 - 20, null);
  };
  
  useEffect(() => {
      getArticlesList(pageCurrent * 20 - 20, token);
      // eslint-disable-next-line
  }, []);

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
  const { genericReducer, articlesReducer } = state;
  const { loader, pageCurrent } = genericReducer;
  const { articles, articlesCount } = articlesReducer;
  return {
    loader,
    pageCurrent,
    articles,    
    articlesCount
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticlesList: (page, token) => dispatch(getArticlesList(page, token)),
  togglePage: (page) => dispatch(togglePage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
