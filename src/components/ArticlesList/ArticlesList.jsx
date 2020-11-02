import React from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';

import ArticlePreview from '../ArticlePreview';

import { getArticlesList, togglePage } from '../../actions';

import './ArticlesList.css';


const mapStateToProps = (state) => {
  const { togglePage, articles, pageCurrent, articlesCount } = state;
  return {
    togglePage,
    articles,
    pageCurrent,
    articlesCount
  };
};

const ArticlesList = (props) => {
  
  const { getArticlesList, togglePage, articles, pageCurrent, articlesCount } = props;
  
  /* const callback = useCallback(() => getArticlesList, [getArticlesList]);
  useEffect(() => callback(), [callback]); */

  if(articles.length === 0) getArticlesList();
  
  const handlePage = (page) => {
    togglePage(page);
    getArticlesList(page * 20 - 20);
  };
  
  return (
    <div>
      <div>
        { articles.map((article) => <ArticlePreview key={article.slug} article={article} />) }
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

export default connect(mapStateToProps, {getArticlesList, togglePage})(ArticlesList);