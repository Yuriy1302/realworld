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
      getArticlesList(0, token);
      // eslint-disable-next-line
  }, [getArticlesList]);

  const handlePage = (page) => {
    togglePage(page);
    token ? getArticlesList(page * 20 - 20, token) : getArticlesList(page * 20 - 20, null);
  };
  
  return (
    <div>
      <div>
        {
          loader
            ? <Spiner />
            : articles.map((article) => (
                <ArticlePreview key={article.slug}article={article} pageCurrent={pageCurrent} />
              ))
        }
      </div>
      <div className="pagination">
        <Pagination
          size="small"
          total={articlesCount}
          pageSize={20}
          showSizeChanger={false}
          current={pageCurrent}
          onChange={handlePage}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loader, togglePage, articles, pageCurrent, articlesCount } = state;
  return {
    loader,
    togglePage,
    articles,
    pageCurrent,
    articlesCount
  };
};

export default connect(mapStateToProps, {getArticlesList, togglePage})(ArticlesList);
